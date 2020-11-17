module LastFM
  module User
    class Taggings < LastFM::Base
      def call
        taggings_data
      end

    private

      def taggings_data
        return empty_hash unless
            all_taggins_args? && parsed_page.present?

        taggings_data_hash
      end

      def all_taggins_args?
        [
          @args.lastfm_id,
          @args.model_name,
          @args.tag_name
        ].all?(&:present?)
      end

      def parsed_page
        @parsed_page ||= JSON.parse(taggings_response)['taggings']
      end

      def taggings_response
        RestClient.get(lastfm_api_link, params: request_params)
      end

      def request_params
        {
          method: 'user.getPersonalTags',
          user: @args.lastfm_id,
          tag: @args.tag_name,
          taggingtype: @args.model_name,
          page: page,
          limit: (@args.limit || 200),
          api_key: lastfm_api_key,
          format: 'json'
        }
      end

      def empty_hash
        {
          user: { name: @args.lastfm_id },
          tag: { name: @args.tag_name },
          model: { name: @args.model_name },
          taggings: {},
          total_count: 0
        }
      end

      def taggings_data_hash
        {
          user: { name: parsed_page['@attr']['user'] },
          tag: { name: parsed_page['@attr']['tag'] },
          model: { name: @args.model_name },
          taggings: format_taggings,
          total_count: parsed_page['@attr']['total'].to_i
        }
      end

      def format_taggings
        taggings.map { |t| format_tagging(t) }
      end

      def taggings
        parsed_page["#{@args.model_name}s"][@args.model_name]
      end

      def format_tagging(tagging)
        send("#{@args.model_name}_attributes", tagging)
      end

      def artist_attributes(tagging)
        {
          name: tagging['name'],
          image: tagging['image'][3]['#text'].presence
        }
      end

      def album_attributes(tagging)
        {
          title: tagging['name'],
          artist: { name: tagging['artist']['name'] },
          cover: tagging['image'][3]['#text'].presence
        }
      end

      def track_attributes(tagging)
        {
          title: tagging['name'],
          artist: track_artist_attributes(tagging),
          duration: tagging['duration'].to_i
        }
      end

      def track_artist_attributes(tagging)
        {
          name: tagging['artist']['name'],
          image: tagging['image'][3]['#text'].presence
        }
      end
    end
  end
end
