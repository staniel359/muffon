module Lastfm
  module Album
    class Tags < Service
      def call
        process_album_tags
      end

    private

      def process_album_tags
        lastfm_tags.map do |tag|
          ::Tag.where(name: tag['name'].downcase).first_or_create.id
        end
      end

      def lastfm_tags
        JSON.parse(
          RestClient.get(
            'http://ws.audioscrobbler.com/2.0/'\
            '?method=album.gettoptags'\
            "&artist=#{query_name(@args.artist_name)}"\
            "&album=#{query_name(@args.album_title)}"\
            "&api_key=#{ENV['LASTFM_KEY']}&format=json"
          ).body
        )['toptags']['tag']
      end
    end
  end
end
