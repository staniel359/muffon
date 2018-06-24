module LastFM
  class Artist
    class Recommendations < LastFM::Base
      def call
        retrieve_recommendations
      end

    private

      def retrieve_recommendations
        recommendations_data.map { |a| process_artist(a) }
      end

      def recommendations_data
        JSON.parse(
          recommendations_response
        ).dig('similarartists', 'artist') || []
      end

      def recommendations_response
        RestClient.get(api_link, params: request_params)
      end

      def request_params
        {
          method:  'artist.getSimilar',
          artist:  @args.artist_name,
          limit:   50,
          api_key: api_key,
          format:  'json'
        }
      end

      def process_artist(artist)
        {
          name:  artist['name'],
          mbid:  artist['mbid'],
          image: artist['image'][3]['#text']
        }
      end
    end
  end
end
