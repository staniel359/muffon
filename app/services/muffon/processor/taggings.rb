module Muffon
  module Processor
    class Taggings < Muffon::Processor::Base
      def call
        process_taggings
      end

    private

      def process_taggings
        Muffon::Processor::Tagging.call(
          profile_tag_id: profile_tag.id,
          model_name:     @args.model_name,
          tagging:        @args.tagging
        )
      end

      def profile_tag
        ::ProfileTag.where(
          profile_id: @args.profile_id,
          tag_id:     process_tag(@args.tag_name).id
        ).first_or_create
      end
    end
  end
end
