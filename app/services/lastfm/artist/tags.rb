module Lastfm
  module Artist
    class Tags < Service
      def call
        process_tags
      end

    private

      def process_tags
        tags.map do |tag|
          Tag.where(name: tag['name'].downcase).first_or_create.id
        end
      end

      def tags
        JSON.parse(
          RestClient.get(
            'http://ws.audioscrobbler.com/2.0/'\
            '?method=artist.gettoptags'\
            "&artist=#{query_name(@args.name)}"\
            "&api_key=#{ENV['LASTFM_KEY']}&format=json"
          ).body
        )['toptags']['tag']
      end
    end
  end
end
