module Lastfm
  module Album
    class Data < Service
      def call
        process_data
      end

    private

      def process_data
        JSON.parse(album_json)['album']
      end

      def album_json
        RestClient.get(
          'http://ws.audioscrobbler.com/2.0/'\
          '?method=album.getinfo'\
          "&artist=#{query_name_of(@args.artist_name)}"\
          "&album=#{query_name_of(@args.title)}"\
          "&api_key=#{ENV['LASTFM_KEY']}&format=json"
        ).body
      end

      def query_name_of(name)
        name.include?('%2F') ? name : CGI.escape(name)
      end
    end
  end
end
