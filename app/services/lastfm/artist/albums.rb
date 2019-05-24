module LastFM
  class Artist
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
          limit: 101,
          api_key: lastfm_api_key,
          format: 'json'
        }
      end

      def artist_data_hash
        {
          name: parsed_page['@attr']['artist'],
          albums: format_albums
        }
      end

      def format_albums
        albums_paginated.map { |a| format_album(a) }
      end

      def albums_paginated
        albums_sorted[array_offset, array_limit] || []
      end

      def albums_sorted
        parsed_page['album'].sort_by do |a|
          a['playcount']
        end.reverse.reject { |a| a['name'] == '(null)' }
      end

      def array_limit
        @args.limit || 20
      end

      def format_album(album)
        {
          title: album['name'],
          artist: { name: album['artist']['name'] },
          lastfm_plays_count: album['playcount'],
          cover: album['image'][3]['#text']
        }
      end
    end
  end
end
