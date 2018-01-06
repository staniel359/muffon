module Bandcamp
  module Album
    class Data < Service
      def call
        process_album_data
      end

    private

      def process_album_data
        return {} unless first_link.present?

        {
          link: link,
          page: page,
          cover: cover,
          tracks: tracks,
          released_at: released_at
        }
      end

      def first_link
        return @args.bandcamp_link if @args.bandcamp_link.present?

        @first_link ||= Bandcamp::Album::Link.call(
          artist_name: @args.artist_name,
          album_title: @args.album_title
        )
      end

      def link
        first_tracks.present? ? first_link : redirect_link
      end

      def first_tracks
        Bandcamp::Album::Tracks.call(page: first_page)
      end

      def first_page
        @first_page ||= Nokogiri::HTML.parse(
          RestClient.get(first_link)
        )
      end

      def redirect_link
        first_page.css('.tralbumData').first.css('a').first['href'].match(
          /(\w+\.bandcamp.com\/album\/\w+(\-\w+)*)/
        )[0]
      end

      def page
        @page ||= first_tracks.present? ? first_page : redirect_page
      end

      def redirect_page
        @redirect_page ||= Nokogiri::HTML.parse(
          RestClient.get(redirect_link)
        )
      end

      def cover
        page.css('.popupImage').first['href']
      end

      def tracks
        return [] unless name.include?(@args.artist_name.downcase)

        first_tracks.present? ? first_tracks : redirect_tracks
      end

      def redirect_tracks
        Bandcamp::Album::Tracks.call(page: redirect_page)
      end

      def name
        page.css('span[itemprop="byArtist"]').css('a').text.downcase
      end

      def released_at
        date_selector = page.css('meta[itemprop="datePublished"]')
        date_selector[0]['content'].to_s.insert(4, '-').insert(7, '-').to_time
      end
    end
  end
end
