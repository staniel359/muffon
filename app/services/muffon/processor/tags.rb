module Muffon
  module Processor
    class Tags < Muffon::Base
      def call
        process_tags
      end

    private

      def process_tags
        return [] unless tags_data.present?

        tags_data.map { |t| process_tag(t) }
      end

      def tags_data
        @args.tags
      end

      def process_tag(tag)
        Muffon::Processor::Tag.call(tag_name: tag)
      end
    end
  end
end
