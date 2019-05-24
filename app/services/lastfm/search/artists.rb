module LastFM
  class Search
    class Artists < LastFM::Base
      def call
        artists_data
      end

    private

      def artists_data
        return empty_hash unless @args.q.present?

        {
          query: @args.q,
          artists: format_artists,
          total_count: total_count
        }
      end

      def empty_hash
        { query: @args.q, artists: {}, total_count: 0 }
      end

      def format_artists
        artists_sorted.map { |a| format_artist(a) }
      end

      def artists_sorted
        artists.sort_by { |a| a['listeners'].to_i }.reverse
      end

      def artists
        parsed_page['artistmatches']['artist'] || []
      end

      def parsed_page
        @parsed_page ||= JSON.parse(artists_response)['results']
      end

      def artists_response
        RestClient.get(lastfm_api_link, params: request_params)
      end

      def request_params
        {
          method: 'artist.search',
          artist: @args.q,
          limit: @args.limit || 20,
          page: page,
          api_key: lastfm_api_key,
          format: 'json'
        }
      end

      def format_artist(artist)
        {
          name: artist['name'],
          image: artist['image'][3]['#text'].presence,
          lastfm_listeners_count: artist['listeners'].to_i
        }
      end

      def total_count
        parsed_page['opensearch:totalResults'].to_i
      end
    end
  end
end
