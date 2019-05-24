module LastFM
  class Artist
    class Tracks < LastFM::Base
      def call
        tracks_data
      end

    private

      def tracks_data
        return empty_hash unless
            @args.artist_name.present? && parsed_page.present?

        tracks_data_hash
      end

      def parsed_page
        @parsed_page ||= JSON.parse(tracks_response)['toptracks']
      end

      def tracks_response
        RestClient.get(lastfm_api_link, params: request_params)
      end

      def request_params
        {
          method: 'artist.getTopTracks',
          artist: @args.artist_name,
          api_key: lastfm_api_key,
          page: page,
          limit: (@args.limit || 50),
          format: 'json'
        }
      end

      def empty_hash
        {
          artist: {},
          tracks: {},
          total_count: 0
        }
      end

      def tracks_data_hash
        {
          artist: { name: parsed_page['@attr']['artist'] },
          tracks: format_tracks,
          total_count: total_count
        }
      end

      def format_tracks
        parsed_page['track'].last(50).map { |t| format_track(t) }
      end

      def format_track(track)
        {
          title: track['name'],
          artist: { name: track['artist']['name'] },
          lastfm_listeners_count: track['listeners'].to_i,
          lastfm_plays_count: track['playcount'].to_i,
          mbid: track['mbid']
        }
      end

      def total_count
        parsed_page['@attr']['total'].to_i
      end
    end
  end
end
