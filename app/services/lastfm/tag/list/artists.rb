module LastFM
  class Tag
    module List
      class Artists < LastFM::Base
        def call
          artists_data
        end

      private

        def artists_data
          return empty_hash unless can_proceed?

          {
            tag: { name: tag_name },
            artists: artist_names
          }
        end

        def can_proceed?
          @args.tag_name.present? &&
            artists_page_response.present?
        end

        def artists_page_response
          @artists_page_response ||=
            RestClient.get("#{tag_page_link}/artists?page=#{page}")
        rescue RestClient::NotFound
          nil
        end

        def empty_hash
          { tag: {}, artists: {} }
        end

        def tag_name
          parsed_page.css('.header-title a').text
        end

        def parsed_page
          @parsed_page ||= Nokogiri::HTML.parse(artists_page_response)
        end

        def artist_names
          parsed_page.css('.big-artist-list-item').css(
            '.link-block-target'
          ).map(&:text)
        end
      end
    end
  end
end
