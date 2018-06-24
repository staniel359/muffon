module LastFM
  class Artist
    class Tracks
      class API < LastFM::Base
        def call
          retrieve_api_data
        end

      private

        def retrieve_api_data
          return {} unless parsed_tracks_data.present?

          {
            total_count: total_count,
            data:        process_tracks
          }
        end

        def parsed_tracks_data
          @parsed_tracks_data ||= JSON.parse(tracks_response)['toptracks']
        end

        def tracks_response
          RestClient.get(api_link, params: request_params)
        end

        def request_params
          {
            method:  'artist.getTopTracks',
            artist:  @args.artist_name,
            api_key: api_key,
            page:    page,
            format:  'json'
          }
        end

        def process_tracks
          parsed_tracks_data['track'].map { |t| process_track(t) }
        end

        def process_track(track)
          {
            title: track['name'],
            lastfm_listeners_count: track['listeners'].to_i,
            lastfm_plays_count: track['playcount'].to_i,
            mbid: track['mbid'],
            artist: artist_data(track)
          }
        end

        def artist_data(track)
          {
            name: track['artist']['name'],
            mbid: track['artist']['mbid'],
            image: track['image'][3]['#text']
          }
        end

        def total_count
          parsed_tracks_data['@attr']['total'].to_i
        end
      end
    end
  end
end
