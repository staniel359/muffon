module LastFM
  class Artist
    class SimilarArtists < LastFM::Base
      def call
        retrieve_similar_artists_data
      end

    private

      def retrieve_similar_artists_data
        return [] unless parsed_artists_page.present?

        LastFM::Artists.call(artists: artists)
      end

      def parsed_artists_page
        @parsed_artists_page ||=
          JSON.parse(artists_page_response)['similarartists']
      end

      def artists_page_response
        RestClient.get(api_link, params: request_params)
      end

      def request_params
        {
          method:  'artist.getSimilar',
          artist:  @args.artist_name,
          limit:   (@args.limit || 200),
          api_key: api_key,
          format:  'json'
        }
      end

      def artists
        artists_paginated.map { |a| a['name'] }
      end

      def artists_paginated
        parsed_artists_page['artist'][offset, array_limit] || []
      end

      def array_limit
        @args.limit || 10
      end

      def offset
        (page.to_i - 1) * array_limit
      end
    end
  end
end
