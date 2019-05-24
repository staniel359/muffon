module LastFM
  class Artist
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
          limit: 200,
          api_key: lastfm_api_key,
          format: 'json'
        }
      end

      def artist_data_hash
        {
          name: parsed_page['@attr']['artist'],
          similar_artists: format_artists || {}
        }
      end

      def format_artists
        artists_paginated.map { |a| format_artist(a) }
      end

      def artists_paginated
        parsed_page['artist'][array_offset, array_limit] || []
      end

      def array_limit
        @args.limit || 10
      end      

      def format_artist(artist)
        {
          name: artist['name'],
          image: artist['image'][3]['#text']
        }
      end
    end
  end
end
