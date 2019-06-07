module LastFM
  class Artist
    class Images < LastFM::Base
      def call
        images_data
      end

    private

      def images_data
        return {} unless
          @args.artist_name.present? && images_list.present?

        artist_data_hash
      end

      def images_list
        @images_list ||= parsed_page.css(
          '.image-list-image'
        ).map { |i| i['src'] }
      end

      def parsed_page
        @parsed_page ||= Nokogiri::HTML.parse(images_page)
      end

      def images_page
        RestClient.get("#{artist_page_link}/+images?page=#{page}")
      rescue RestClient::NotFound
        ''
      end

      def artist_data_hash
        {
          artist: { name: artist_name },
          images: images_list,
          total_count: (last_page || 1).to_i * 40
        }
      end

      def artist_name
        parsed_page.css('.header-title a').text
      end

      def last_page
        parsed_page.css('.pagination-page').last&.text&.strip
      end
    end
  end
end
