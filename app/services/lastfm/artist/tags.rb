module Lastfm
  module Artist
    class Tags < Service
      def call
        process_artist_tags
      end

    private

      def process_artist_tags
        JSON.parse(tags_json)['toptags']['tag']
      end

      def tags_json
        RestClient.get(
          'http://ws.audioscrobbler.com/2.0/'\
          '?method=artist.gettoptags'\
          "&artist=#{query_name(@args.name)}"\
          "&api_key=#{ENV['LASTFM_KEY']}&format=json"
        ).body
      end
    end
  end
end
