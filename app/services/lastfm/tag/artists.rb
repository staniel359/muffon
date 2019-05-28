module LastFM
  class Tag
    class Artists < LastFM::Base
      def call
        artists_data
      end

    private

      def artists_data
        return empty_hash unless
            @args.tag_name.present? && artists_page_response.present?

        {
          tag: { name: tag_name },
          artists: artists_data_hash,
          total_count: total_count
        }
      end

      def artists_page_response
        @artists_page_response ||=
          RestClient.get("#{tag_page_link}/artists?page=#{page}")
      rescue RestClient::NotFound
        nil
      end

      def empty_hash
        {
          tag: { name: @args.tag_name },
          artists: {},
          total_count: 0
        }
      end

      def tag_name
        parsed_page.css('.header-title a').text
      end

      def parsed_page
        @parsed_page ||= Nokogiri::HTML.parse(artists_page_response)
      end

      def artists_data_hash
        LastFM::Artists.call(
          artist_names: artist_names.first(@args.limit || 21)
        )[:artists]
      end

      def artist_names
        parsed_page.css('.big-artist-list-item').css(
          '.link-block-target'
        ).map(&:text)
      end

      def total_count
        parsed_page.css(
          '.pagination-page'
        ).last.text.strip.to_i * 21
      end
    end
  end
end
