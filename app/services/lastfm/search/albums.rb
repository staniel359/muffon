module LastFM
  class Search
    class Albums < LastFM::Base
      def call
        search_albums
      end

    private

      def search_albums
        {
          data:        process_albums,
          total_count: total_count
        }
      end

      def process_albums
        return [] unless @args.q.present?

        albums.map { |a| process_album(a) }
      end

      def process_album(album)
        {
          title:  album['name'],
          artist: { name: album['artist'] },
          cover:  album['image'][3]['#text'].presence
        }
      end

      def albums
        @args.albums || search_results || []
      end

      def search_results
        parsed_albums_data['albummatches']['album']
      end

      def parsed_albums_data
        @parsed_albums_data ||= JSON.parse(albums_response)['results']
      end

      def albums_response
        RestClient.get(api_link, params: request_params)
      end

      def request_params
        {
          method: 'album.search',
          album:   @args.q,
          limit:   @args.limit || 20,
          page:    page,
          api_key: api_key,
          format: 'json'
        }
      end

      def total_count
        return 0 unless @args.q.present?

        parsed_albums_data['opensearch:totalResults'].to_i
      end
    end
  end
end
