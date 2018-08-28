module Muffon
  module Processor
    class Tagging < Muffon::Processor::Base
      def call
        process_tagging
      end

    private

      def process_tagging
        model.taggings.where(
          profile_tag_id: @args.profile_tag_id
        ).first_or_create
      end

      def model
        send("update_#{@args.model_name}", @args[:tagging])
      end
    end
  end
end
