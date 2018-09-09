module LastFM
  class Tag
    class Artists < LastFM::Base
      def call
        retrieve_artists_data
      end

    private

      def retrieve_artists_data
        return {} unless @args.tag_name.present?
        return {} unless artists_page_response.present?

        {
          data:        artists_data,
          total_count: total_count
        }
      end

      def artists_page_response
        @artists_page_response ||= begin
          RestClient.get("#{tag_page_link}/artists?page=#{page}")
        rescue RestClient::NotFound
          nil
        end
      end

      def artists_data
        LastFM::Artists.call(
          artists: artist_names.first(@args.limit || 21)
        )
      end

      def artist_names
        artists_list.css('.link-block-target').map(&:text)
      end

      def artists_list
        parsed_artists_page.css('.big-artist-list-item')
      end

      def parsed_artists_page
        @parsed_artists_page ||=
          Nokogiri::HTML.parse(artists_page_response)
      end

      def total_count
        parsed_artists_page.css(
          '.pagination-page'
        ).last.text.strip.to_i * 21
      end
    end
  end
end
