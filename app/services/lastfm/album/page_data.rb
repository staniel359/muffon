module LastFM
  class Album
    class PageData < LastFM::Base
      def call
        retrieve_album_page_data
      end

    private

      def retrieve_album_page_data
        {
          release_date: release_date,
          tags:         tags,
          tracks:       tracks
        }
      end

      def release_date
        release_date_text&.to_time&.strftime('%Y-%m-%d')
      rescue ArgumentError
        release_date_text
      end

      def release_date_text
        release_date_selector&.css('.metadata-display')&.text
      end

      def release_date_selector
        raw_data.css('.metadata-item')[0]
      end

      def raw_data
        @raw_data ||= Nokogiri::HTML.parse(album_page_response)
      end

      def album_page_response
        RestClient.get(album_page_link)
      rescue RestClient::NotFound
        nil
      end

      def album_page_link
        "#{artist_page_link}/#{CGI.escape(@args.album_title)}"
      end

      def tags
        raw_data.css('.tag').map(&:text)
      end

      def tracks
        tracks_list.map { |t| process_track(t) }
      end

      def tracks_list
        raw_data.css('tr[itemprop="track"]')
      end

      def process_track(track)
        {
          title:    title(track),
          duration: duration(track),
          artist:   artist(track)
        }
      end

      def title(track)
        track.css(
          '.chartlist-name'
        ).css('.link-block-target').text.strip
      end

      def duration(track)
        track.css(
          '.chartlist-duration'
        ).text.strip.split(':').map(&:to_i).inject { |m, s| m * 60 + s }
      end

      def artist(track)
        track.css(
          '.chartlist-name'
        ).css('.chartlist-artists')&.text&.strip.presence
      end
    end
  end
end
