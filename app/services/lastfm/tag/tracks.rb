module LastFM
  class Tag
    class Tracks < LastFM::Base
      def call
        retrieve_tracks_data
      end

    private

      def retrieve_tracks_data
        return unless @args.tag_name.present?

        {
          data:        process_tracks,
          total_count: total_count
        }
      end

      def process_tracks
        tracks_list.map { |t| process_track(t) }
      end

      def tracks_list
        parsed_tracks_page.css('.chartlist-ellipsis-wrap')
      end

      def parsed_tracks_page
        @parsed_tracks_page ||=
          Nokogiri::HTML.parse(tracks_page_response)
      end

      def tracks_page_response
        RestClient.get("#{tag_page_link}/tracks?page=#{page}")
      end

      def process_track(track)
        {
          title:  track.css('.link-block-target').text,
          artist: { name: artist_name(track) }
        }
      end

      def artist_name(track)
        track.css('.chartlist-artists').css('a').text
      end

      def total_count
        parsed_tracks_page.css(
          '.pagination-page'
        ).last.text.strip.to_i * 50
      end
    end
  end
end
