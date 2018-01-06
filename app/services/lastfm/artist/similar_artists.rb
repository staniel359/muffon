module Lastfm
  module Artist
    class SimilarArtists < Service
      def call
        process_artist_similars
      end

    private

      def process_artist_similars
        artist_similars[(page.to_i - 1) * 15, 15]
      end

      def artist_similars
        JSON.parse(similars_json)['similarartists']['artist']
      end

      def similars_json
        RestClient.get(
          'http://ws.audioscrobbler.com/2.0/'\
          '?method=artist.getSimilar'\
          "&artist=#{query_name(@args.name)}&limit=200"\
          "&api_key=#{ENV['LASTFM_KEY']}&format=json"
        ).body
      end
    end
  end
end
