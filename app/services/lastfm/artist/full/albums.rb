module LastFM
  class Artist
    module Full
      class Albums < LastFM::Base
        def call
          albums_data
        end

      private

        def albums_data
          return {} unless parsed_page.present?

          { artist: artist_data_hash }
        end

        def parsed_page
          @parsed_page ||= JSON.parse(albums_response)['topalbums']
        end

        def albums_response
          RestClient.get(lastfm_api_link, params: request_params)
        end

        def request_params
          {
            method: 'artist.getTopAlbums',
            artist: @args.artist_name,
            limit: (@args.limit || 20),
            page: page,
            api_key: lastfm_api_key,
            format: 'json'
          }
        end

        def artist_data_hash
          {
            name: parsed_page['@attr']['artist'],
            albums: albums
          }
        end

        def albums
          LastFM::Albums.call()
        end
      end
    end
  end
end
