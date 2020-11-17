module LastFM
  module User
    class LovedTracks < LastFM::Base
      def call
        loved_tracks_data
      end

    private

      def loved_tracks_data
        return empty_hash unless
            [@args.lastfm_id, loved_tracks_response].all?(&:present?)

        loved_tracks_data_hash
      end

      def loved_tracks_response
        @loved_tracks_response ||=
          RestClient.get(lastfm_api_link, params: request_params)
      rescue RestClient::NotFound
        nil
      end

      def empty_hash
        {
          user: { name: @args.lastfm_id },
          loved_tracks: {},
          total_count: 0,
          pages_count: 0
        }
      end

      def loved_tracks_data_hash
        {
          user: { name: parsed_page['@attr']['user'] },
          loved_tracks: format_tracks,
          total_count: parsed_page['@attr']['total'].to_i,
          pages_count: parsed_page['@attr']['totalPages'].to_i
        }
      end

      def request_params
        {
          method: 'user.getLovedTracks',
          user: @args.lastfm_id,
          page: page,
          limit: 200,
          api_key: lastfm_api_key,
          format: 'json'
        }
      end

      def format_tracks
        parsed_page['track'].map { |t| format_track(t) }
      end

      def parsed_page
        @parsed_page ||=
          JSON.parse(loved_tracks_response)['lovedtracks']
      end

      def format_track(track)
        {
          title: track['name'],
          artist: artist_data(track),
          loved_at: Time.at(track['date']['uts'].to_i)
        }
      end

      def artist_data(track)
        {
          name: track['artist']['name'],
          image: track['image'][3]['#text']
        }
      end
    end
  end
end
