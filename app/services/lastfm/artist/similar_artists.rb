module LastFM
  class Artist
    class SimilarArtists < LastFM::Base
      def call
        similar_artists_data
      end

    private

      def similar_artists_data
        return empty_hash unless
            [@args.artist_name, parsed_page].all?(&:present?)

        similar_artists_data_hash
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

      def empty_hash
        { artist: {}, artists: [] }
      end

      def similar_artists_data_hash
        {
          artist: { name: parsed_page['@attr']['artist'] },
          artists: artists_sorted || {}
        }
      end

      def artists_sorted
        process_artists.sort_by { |a| a[0] }.transpose[1]
      end

      def process_artists
        artists_data_array = []
        threads = []
        artist_names.each_with_index do |a, i|
          threads << Thread.new do
            artists_data_array << [i, artist_data(a)]
          end
        end
        concurrent_loader { threads.each(&:join) }
        artists_data_array
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

      def artist_data(artist)
        LastFM::Artist.call(artist_name: artist)
      end
    end
  end
end
