module LastFM
  class Artist
    class Images < LastFM::Base
      def call
        retrieve_artist_images
      end

    private

      def retrieve_artist_images
        {
          data:        process_images,
          total_count: total_count
        }
      end

      def process_images
        images_list.map { |i| i['src'] }
      end

      def images_list
        parsed_images_page.css('.image-list-image')
      end

      def parsed_images_page
        @parsed_images_page ||= Nokogiri::HTML.parse(images_page)
      end

      def images_page
        RestClient.get("#{artist_page_link}/+images?page=#{page}")
      end

      def total_count
        (last_page || 1).to_i * 40
      end

      def last_page
        parsed_images_page.css('.pagination-page').last&.text&.strip
      end
    end
  end
end
