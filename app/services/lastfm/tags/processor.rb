module Lastfm
  module Tags
    class Processor < Service
      def call
        process_taggings
      end

    private

      def process_taggings
        %w[Artist Album Track].each do |model|
          process_taggings_of(model)
        end
      end

      def process_taggings_of(model)
        taggings_of(model.downcase).each do |tagging|
          "Lastfm::Tags::Taggings::#{model}".constantize.call(
            tagging_params_of(tagging)
          )
        end
      end

      def taggings_of(model)
        json_of(model)['taggings']["#{model}s"][model.to_s]
      end

      def json_of(model)
        JSON.parse(link_of(model))
      end

      def link_of(model)
        RestClient.get(
          'http://ws.audioscrobbler.com/2.0/'\
          '?method=user.getpersonaltags'\
          "&user=#{@profile.lastfm_id}"\
          "&tag=#{@args.tag['name']}"\
          "&taggingtype=#{model}&limit=200"\
          "&api_key=#{ENV['LASTFM_KEY']}&format=json"
        ).body
      end

      def tagging_params_of(tagging)
        {
          profile_id: @profile.id,
          tagging: tagging,
          tag_id: tag_id,
          profile_tag_id: profile_tag_id
        }
      end

      def tag_id
        @tag_id ||= ::Tag.where(
          name: @args.tag['name'].downcase
        ).first_or_create.id
      end

      def profile_tag_id
        @profile.profile_tags.where(
          tag_id: tag_id
        ).first_or_create.id
      end
    end
  end
end
