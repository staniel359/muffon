module Lastfm
  module Artist
    class Tracks < Service
      def call
        process_tracks
      end

    private

      def process_tracks
        tracks.sort_by do |track|
          track['playcount'].to_i
        end.reverse
      end

      def tracks
        JSON.parse(tracks_json)['toptracks']['track']
      end

      def tracks_json
        RestClient.get(
          'http://ws.audioscrobbler.com/2.0/'\
          '?method=artist.gettoptracks'\
          "&artist=#{query_name(@args.name)}"\
          "&limit=#{@args.limit}&page=#{page}"\
          "&api_key=#{ENV['LASTFM_KEY']}&format=json"
        ).body
      end
    end
  end
end
