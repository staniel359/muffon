module Muffon
  module Processor
    class Tag < Muffon::Base
      def call
        process_tag
      end

    private

      def process_tag
        ::Tag.where(
          'LOWER(name) = ?', @args.tag_name.downcase
        ).first_or_create(name: @args.tag_name)
      end
    end
  end
end
