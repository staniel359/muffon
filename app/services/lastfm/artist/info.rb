module Lastfm
  module Artist
    class Info < Service
      def call
        process_artist_info
      end

    private

      def process_artist_info
        JSON.parse(info_json)['artist']
      end

      def info_json
        RestClient.get(
          'http://ws.audioscrobbler.com/2.0/'\
          '?method=artist.getinfo'\
          "&artist=#{query_name(@args.name)}"\
          "&api_key=#{ENV['LASTFM_KEY']}&format=json"
        ).body
      end
    end
  end
end
