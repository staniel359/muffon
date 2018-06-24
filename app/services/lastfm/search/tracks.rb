module LastFM
  class Search
    class Tracks < LastFM::Base
      def call
        search_tracks
      end

    private

      def search_tracks
        {
          data:        process_tracks,
          total_count: total_count
        }
      end

      def process_tracks
        return [] unless @args.q.present?

        tracks_sorted.map { |t| process_track(t) }
      end

      def process_track(track)
        {
          title:                  track['name'],
          artist:                 artist_data(track),
          lastfm_listeners_count: track['listeners'].to_i
        }
      end

      def artist_data(track)
        {
          name:  track['artist'],
          image: track['image'][3]['#text'].presence
        }
      end

      def tracks_sorted
        tracks.sort_by { |t| t['listeners'].to_i }.reverse
      end

      def tracks
        @args.tracks || search_results || []
      end

      def search_results
        parsed_tracks_data['trackmatches']['track']
      end

      def parsed_tracks_data
        @parsed_tracks_data ||= JSON.parse(tracks_request)['results']
      end

      def tracks_request
        RestClient.get(api_link, params: request_params)
      end

      def request_params
        {
          method:  'track.search',
          track:   @args.q,
          limit:   @args.limit || 20,
          page:    page,
          api_key: api_key,
          format:  'json'
        }
      end

      def total_count
        return 0 unless @args.q.present?

        parsed_tracks_data['opensearch:totalResults'].to_i
      end
    end
  end
end
