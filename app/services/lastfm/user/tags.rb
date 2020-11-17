module LastFM
  module User
    class Tags < LastFM::Base
      def call
        tags_data
      end

    private

      def tags_data
        return empty_hash unless
            @args.lastfm_id.present? && parsed_page.present?

        {
          user: { name: parsed_page['@attr']['user'] },
          tags: format_tags
        }
      end

      def parsed_page
        @parsed_page ||= JSON.parse(tags_response)['toptags']
      end

      def tags_response
        RestClient.get(lastfm_api_link, params: request_params)
      end

      def request_params
        {
          method: 'user.getTopTags',
          limit: 1000,
          user: @args.lastfm_id,
          api_key: lastfm_api_key,
          format: 'json'
        }
      end

      def empty_hash
        {
          user: { name: @args.lastfm_id },
          tags: {}
        }
      end

      def format_tags
        parsed_page['tag'].map { |t| t['name'] }
      end
    end
  end
end
