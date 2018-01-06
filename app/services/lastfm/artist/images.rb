module Lastfm
  module Artist
    class Images < Service
      def call
        process_artist_images
      end

    private

      def process_artist_images
        Nokogiri::HTML.parse(
          RestClient.get(
            'https://www.last.fm/music/'\
            "#{query_name(@args.name)}/+images?page=#{page}"
          )
        ).css('.image-list-image').map { |i| i['src'] }
      end
    end
  end
end
