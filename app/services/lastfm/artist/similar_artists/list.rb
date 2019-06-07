module LastFM
  class Artist
    class SimilarArtists
      class List < LastFM::Base
        def call
          similar_artists_list
        end

      private

        def similar_artists_list
          return empty_hash unless can_proceed?

          {
            artist: artist_name,
            similar_artists: similar_artists
          }
        end

        def can_proceed?
          @args.artist_name.present? &&
            parsed_response.present?
        end

        def parsed_response
          @parsed_response ||=
            JSON.parse(page_response)['similarartists']
        end

        def page_response
          RestClient.get(
            lastfm_api_link, params: request_params
          )
        end

        def request_params
          {
            method: 'artist.getsimilar',
            artist: @args.artist_name,
            api_key: lastfm_api_key,
            limit: @args.limit,
            format: 'json'
          }
        end

        def empty_hash
          {
            artist: {},
            similar_artists: []
          }
        end

        def artist_name
          { name: parsed_response.dig('@attr', 'artist') }
        end

        def similar_artists
          parsed_response['artist'].map { |a| a['name'] }
        end
      end
    end
  end
end
