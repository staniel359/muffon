module LastFM
  class Artist
    class SimilarArtists < LastFM::Base
      LIMIT = 15

      def call
        retrieve_similar_artists_data
      end

    private

      def retrieve_similar_artists_data
        LastFM::Artists.call(artists: artists) || []
      end

      def artists
        artists_paginated.map { |a| a['name'] }
      end

      def artists_paginated
        parsed_artists_page[offset, LIMIT] || []
      end

      def parsed_artists_page
        JSON.parse(artists_page_response)['similarartists']['artist']
      end

      def artists_page_response
        RestClient.get(api_link, params: request_params)
      end

      def request_params
        {
          method:  'artist.getSimilar',
          artist:  @args.artist_name,
          limit:   200,
          api_key: api_key,
          format:  'json'
        }
      end

      def offset
        (page.to_i - 1) * LIMIT
      end
    end
  end
end
