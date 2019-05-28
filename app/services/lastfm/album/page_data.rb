module LastFM
  class Album
    class PageData < LastFM::Base
      def call
        album_data
      end

    private

      def album_data
        return {} unless album_page_response.present?

        { album: album_data_hash }
      end

      def album_page_response
        @album_page_response ||=
          RestClient.get(album_page_link)
      rescue RestClient::NotFound
        nil
      end

      def album_data_hash
        {
          title: title,
          artist: { name: artist_name },
          release_date: release_date,
          tags: tags,
          tracks: tracks
        }
      end

      def title
        parsed_page.css('.header-title').text.strip
      end

      def parsed_page
        @parsed_page ||= Nokogiri::HTML.parse(album_page_response)
      end

      def artist_name
        parsed_page.css(
          '.header-title-column-ellipsis-wrap'
        ).css('span[itemprop="name"]').text
      end

      def release_date
        release_date_text&.to_time&.strftime('%d-%m-%Y')
      rescue ArgumentError
        release_date_text
      end

      def release_date_text
        parsed_page.css('.metadata-item')[0]&.css(
          '.metadata-display'
        )&.text
      end

      def tags
        parsed_page.css('.tag').map(&:text)
      end

      def tracks
        tracks_list.map { |t| process_track(t) }
      end

      def tracks_list
        parsed_page.css('tr[itemprop="track"]')
      end

      def process_track(track)
        {
          title: track_title(track),
          duration: track_duration(track),
          artist: track_artist_data(track)
        }
      end

      def track_title(track)
        track.css(
          '.chartlist-name'
        ).css('.link-block-target').text.strip
      end

      def track_duration(track)
        convert_to_seconds(track.css('.chartlist-duration').text.strip)
      end

      def track_artist_data(track)
        { name: track_artist_name(track) || artist_name }
      end

      def track_artist_name(track)
        track.css(
          '.chartlist-name'
        ).css('.chartlist-artists')&.text&.strip.presence
      end
    end
  end
end
