module LastFM
  class Tag
    class Tracks < LastFM::Base
      def call
        tracks_data
      end

    private

      def tracks_data
        return empty_hash unless
            @args.tag_name.present? && tracks_page_response.present?

        {
          tag: { name: tag_name },
          tracks: format_tracks,
          total_count: total_count
        }
      end

      def tracks_page_response
        @tracks_page_response ||=
          RestClient.get(
            "#{tag_page_link}/tracks?page=#{page}"
          )
      rescue RestClient::NotFound
        nil
      end

      def empty_hash
        { tag: { name: @args.tag_name }, tracks: {}, total_count: 0 }
      end

      def tag_name
        parsed_page.css('.header-title a').text
      end

      def parsed_page
        @parsed_page ||=
          Nokogiri::HTML.parse(tracks_page_response)
      end

      def format_tracks
        tracks_list.first(@args.limit || 50).map { |t| format_track(t) }
      end

      def tracks_list
        parsed_page.css('.chartlist-ellipsis-wrap')
      end

      def format_track(track)
        {
          title: track.css('.link-block-target').text,
          artist: { name: artist_name(track) }
        }
      end

      def artist_name(track)
        track.css('.chartlist-artists').css('a').text
      end

      def total_count
        parsed_page.css('.pagination-page').last.text.strip.to_i * 50
      end
    end
  end
end
