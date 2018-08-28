module LastFM
  class Album
    class PageData < LastFM::Base
      def call
        retrieve_album_page_data
      end

    private

      def retrieve_album_page_data
        {
          title:        title,
          artist:       album_artist_data,
          release_date: release_date,
          tags:         tags,
          tracks:       tracks
        }
      end

      def title
        raw_data.css('.header-title').text.strip
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

      def album_artist_data
        { name: album_artist_name }
      end

      def album_artist_name
        raw_data.css(
          '.header-title-column-ellipsis-wrap'
        ).css('span[itemprop="name"]').text
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
          title:    track_title(track),
          duration: track_duration(track),
          artist:   track_artist_data(track)
        }
      end

      def track_title(track)
        track.css(
          '.chartlist-name'
        ).css('.link-block-target').text.strip
      end

      def track_duration(track)
        track.css(
          '.chartlist-duration'
        ).text.strip.split(':').map(&:to_i).inject { |m, s| m * 60 + s }
      end

      def track_artist_data(track)
        { name: track_artist_name(track) || album_artist_name }
      end

      def track_artist_name(track)
        track.css(
          '.chartlist-name'
        ).css('.chartlist-artists')&.text&.strip.presence
      end
    end
  end
end
