module Muffon
  module Processor
    class Labels < Muffon::Base
      def call
        process_labels
      end

    private

      def process_labels
        return [] unless labels_data.present?

        labels_data.map { |l| process_label(l) }
      end

      def labels_data
        @args.labels
      end

      def process_label(label)
        Label.where(
          'LOWER(name) = ?', label.downcase
        ).first_or_create(name: label)
      end
    end
  end
end
