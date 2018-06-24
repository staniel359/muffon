module LastFM
  class Search
    class Artists < LastFM::Base
      def call
        search_artists
      end

    private

      def search_artists
        {
          data:        process_artists,
          total_count: total_count
        }
      end

      def process_artists
        return [] unless @args.q.present?

        artists_sorted.map { |a| process_artist(a) }
      end

      def process_artist(artist)
        {
          name:                   artist['name'],
          image:                  artist['image'][3]['#text'].presence,
          lastfm_listeners_count: artist['listeners'].to_i
        }
      end

      def artists_sorted
        artists.sort_by { |a| a['listeners'].to_i }.reverse
      end

      def artists
        @args.artists || search_results || []
      end

      def search_results
        parsed_artists_data['artistmatches']['artist']
      end

      def parsed_artists_data
        @parsed_artists_data ||= JSON.parse(artists_response)['results']
      end

      def artists_response
        RestClient.get(api_link, params: request_params)
      end

      def request_params
        {
          method:  'artist.search',
          artist:  @args.q,
          limit:   @args.limit || 20,
          page:    page,
          api_key: api_key,
          format: 'json'
        }
      end

      def total_count
        return 0 unless @args.q.present?

        parsed_artists_data['opensearch:totalResults'].to_i
      end
    end
  end
end
