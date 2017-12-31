module Lastfm
  module Artist
    class Albums < Service
      def call
        process_albums
      end

    private

      def process_albums
        albums.sort_by do |album|
          album['playcount'].to_i
        end.reverse
      end

      def albums
        JSON.parse(albums_json)['topalbums']['album']
      end

      def albums_json
        RestClient.get(
          'http://ws.audioscrobbler.com/2.0/'\
          '?method=artist.gettopalbums'\
          "&artist=#{query_name(@args.name)}"\
          "&limit=#{@args.limit}&page=#{page}"\
          "&api_key=#{ENV['LASTFM_KEY']}&format=json"
        ).body
      end
    end
  end
end
