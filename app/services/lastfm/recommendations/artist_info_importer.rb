module Lastfm
  module Recommendations
    class ArtistInfoImporter < Service
      def call
        process_info
      end

    private

      def process_info
        JSON.parse(open(link).read)['artist']
      end

      def link
        'http://ws.audioscrobbler.com/2.0/'\
        '?method=artist.getinfo'\
        "&artist=#{CGI.escape(@args.artist_name)}"\
        "&api_key=#{ENV['LASTFM_KEY']}&format=json"
      end
    end
  end
end
