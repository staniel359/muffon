module LastFM
  module User
    class Tags < LastFM::Base
      def call
        retrieve_tags_data
      end

    private

      def retrieve_tags_data
        parsed_tags_data.map { |t| t['name'] }
      end

      def parsed_tags_data
        JSON.parse(tags_response).dig('toptags', 'tag') || []
      end

      def tags_response
        RestClient.get(api_link, params: request_params)
      end

      def request_params
        {
          method:  'user.getTopTags',
          limit:   1000,
          user:    @args.lastfm_id,
          api_key: api_key,
          format:  'json'
        }
      end
    end
  end
end
