module LastFM
  class Artist
    class Albums < LastFM::Base
      def call
        retrieve_artist_albums
      end

    private

      def retrieve_artist_albums
        return {} unless parsed_albums_data.present?

        albums_sorted.map { |a| process_album(a) }
      end

      def parsed_albums_data
        @parsed_albums_data ||= JSON.parse(albums_response)['topalbums']
      end

      def albums_response
        RestClient.get(api_link, params: request_params)
      end

      def request_params
        {
          method:  'artist.getTopAlbums',
          artist:  @args.artist_name,
          limit:   (@args.limit || 20),
          page:    page,
          api_key: api_key,
          format:  'json'
        }
      end

      def albums_sorted
        parsed_albums_data['album'].sort_by { |a| a['playcount'] }.reverse
      end

      def process_album(album)
        {
          title:              album['name'],
          artist:             artist_data(album),
          lastfm_plays_count: album['playcount'],
          mbid:               album['mbid'],
          cover:              album['image'][3]['#text']
        }
      end

      def artist_data(album)
        {
          name: album['artist']['name'],
          mbid: album['artist']['mbid']
        }
      end
    end
  end
end
