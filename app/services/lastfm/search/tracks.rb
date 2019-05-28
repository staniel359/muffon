module LastFM
  class Search
    class Tracks < LastFM::Base
      def call
        tracks_data
      end

    private

      def tracks_data
        return empty_hash unless @args.q.present?

        {
          query: @args.q,
          tracks: format_tracks,
          total_count: total_count
        }
      end

      def empty_hash
        { query: @args.q, tracks: {}, total_count: 0 }
      end

      def format_tracks
        tracks_sorted.map { |t| format_track(t) }
      end

      def tracks_sorted
        tracks.sort_by { |t| t['listeners'].to_i }.reverse
      end

      def tracks
        parsed_page['trackmatches']['track'] || []
      end

      def parsed_page
        @parsed_page ||= JSON.parse(tracks_request)['results']
      end

      def tracks_request
        RestClient.get(lastfm_api_link, params: request_params)
      end

      def request_params
        {
          method: 'track.search',
          track: @args.q,
          limit: @args.limit || 20,
          page: page,
          api_key: lastfm_api_key,
          format: 'json'
        }
      end

      def format_track(track)
        {
          title: track['name'],
          artist: artist_data(track),
          lastfm_listeners_count: track['listeners'].to_i
        }
      end

      def artist_data(track)
        {
          name: track['artist'],
          image: track['image'][3]['#text'].presence
        }
      end

      def total_count
        parsed_page['opensearch:totalResults'].to_i
      end
    end
  end
end
