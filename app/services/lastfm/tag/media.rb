module Lastfm
  module Tag
    class Media < Service
      def call
        process_tag_media
      end

    private

      def process_tag_media
        {
          artists: artists,
          albums: albums,
          tracks: tracks
        }
      end

      def artists
        tag_page.css(
          'div[data-selectable-range-selectbox="top_artists"]'
        ).css('.grid-items-item').first(4).map do |a|
          ::Artist.where(
            name: a.css('.link-block-target').text
          ).first_or_initialize.tap do |h|
            h.listeners = a.css('.grid-items-item-aux-text').text.tr(',', '')
            h.image = a.css('img').attr('src').value
            h.save
          end
        end
      end

      def tag_page
        @tag_page ||= Nokogiri::HTML.parse(
          RestClient.get(
            "https://www.last.fm/tag/#{query_name(@args.name)}"
          )
        )
      end

      def albums
        tag_page.css(
          'div[data-selectable-range-selectbox="top_albums"]'
        ).css('.grid-items-item').first(4).map do |a|
          ::Album.where(
            title: a.css('.link-block-target').text,
            artist_id: album_artist(a).id
          ).first_or_initialize.tap do |h|
            a.css('.grid-items-item-aux-block').remove
            a.css('.stat-name').remove

            h.listeners = a.css('.grid-items-item-aux-text').text.tr(',', '')
            h.cover = a.css('img').attr('src').value
            h.save
          end
        end
      end

      def album_artist(a)
        ::Artist.where(
          name: a.css('.grid-items-item-aux-block').text
        ).first_or_create
      end

      def tracks
        tag_page.css(
          'div[data-selectable-range-selectbox="top_tracks"]'
        ).css('tr[itemprop="track"]').map do |t|
          ::Track.where(
            title: t.css('.link-block-target').text,
            artist_id: track_artist(t).id
          ).first_or_create
        end
      end

      def track_artist(t)
        ::Artist.where(
          name: t.css('.chartlist-artists').css('a').text
        ).first_or_create
      end
    end
  end
end
