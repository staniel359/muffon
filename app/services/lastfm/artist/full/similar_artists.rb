module LastFM
  class Artist
    module Full
      class SimilarArtists < LastFM::Base
        def call
          similar_artists_data
        end

      private

        def similar_artists_data
          return {} unless parsed_page.present?

          { artist: artist_data_hash }
        end

        def parsed_page
          @parsed_page ||=
            JSON.parse(artists_page_response)['similarartists']
        end

        def artists_page_response
          RestClient.get(lastfm_api_link, params: request_params)
        end

        def request_params
          {
            method: 'artist.getSimilar',
            artist: @args.artist_name,
            limit: (@args.limit || 200),
            api_key: lastfm_api_key,
            format: 'json'
          }
        end

        def artist_data_hash
          {
            name: parsed_page['@attr']['artist'],
            similar_artists: similar_artists
          }
        end

        def similar_artists
          LastFM::Artists.call(artist_names: artist_names)[:artists]
        end

        def artist_names
          artists_paginated.map { |a| a['name'] }
        end

        def artists_paginated
          parsed_page['artist'][array_offset, array_limit] || []
        end

        def array_limit
          @args.limit || 10
        end
      end
    end
  end
end
