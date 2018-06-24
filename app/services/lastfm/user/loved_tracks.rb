module LastFM
  module User
    class LovedTracks < LastFM::Base
      def call
        retrieve_loved_tracks_data
      end

    private

      def retrieve_loved_tracks_data
        {
          tracks:      formatted_loved_tracks,
          total_count: parsed_loved_tracks.dig('@attr', 'total').to_i,
          pages_count: parsed_loved_tracks.dig('@attr', 'totalPages').to_i
        }
      end

      def formatted_loved_tracks
        parsed_loved_tracks['track'].map do |t|
          {
            title:    t['name'],
            mbid:     t['mbid'],
            loved_at: Time.at(t.dig('date', 'uts').to_i),
            artist:   artist_data(t)
          }
        end
      end

      def parsed_loved_tracks
        @parsed_loved_tracks ||=
          JSON.parse(loved_tracks_response)['lovedtracks']
      end

      def loved_tracks_response
        RestClient.get(api_link, params: request_params)
      end

      def request_params
        {
          method:  'user.getLovedTracks',
          user:    @args.lastfm_id,
          page:    page,
          limit:   200,
          api_key: api_key,
          format:  'json'
        }
      end

      def artist_data(track)
        {
          name:  track.dig('artist', 'name'),
          mbid:  track.dig('artist', 'mbid'),
          image: track.dig('image', 3, '#text')
        }
      end
    end
  end
end
