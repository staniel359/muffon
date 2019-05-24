module LastFM
  class Search
    class Albums < LastFM::Base
      def call
        albums_data
      end

    private

      def albums_data
        return empty_hash unless @args.q.present?

        {
          query: @args.q,
          albums: format_albums,
          total_count: total_count
        }
      end

      def empty_hash
        { query: @args.q, albums: {}, total_count: 0 }
      end

      def format_albums
        albums.map { |a| format_album(a) }
      end

      def albums
        parsed_page['albummatches']['album'] || [] 
      end

      def parsed_page
        @parsed_page ||= JSON.parse(albums_response)['results']
      end

      def albums_response
        RestClient.get(lastfm_api_link, params: request_params)
      end

      def request_params
        {
          method: 'album.search',
          album: @args.q,
          limit: @args.limit || 20,
          page: page,
          api_key: lastfm_api_key,
          format: 'json'
        }
      end

      def format_album(album)
        {
          title: album['name'],
          artist: { name: album['artist'] },
          cover: album['image'][3]['#text'].presence
        }
      end

      def total_count
        parsed_page['opensearch:totalResults'].to_i
      end
    end
  end
end
