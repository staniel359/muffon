module Muffon
  module Processor
    class Taggings < Muffon::Base
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
          tag_id:     tag.id
        ).first_or_create
      end

      def tag
        Muffon::Processor::Tag.call(tag_name: @args.tag_name)
      end
    end
  end
end
