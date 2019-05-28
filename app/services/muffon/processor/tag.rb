module Muffon
  module Processor
    class Tag < Muffon::Processor::Base
      def call
        process_tag
      end

    private

      def process_tag
        return empty_hash unless tag_data.present?

        tag_data.tap do |tag|
          tag[:artists] = tag[:artists].map { |a| update_artist(a) }
          tag[:albums]  = tag[:albums].map { |a| update_album(a) }
          tag[:tracks]  = tag[:tracks].map { |t| update_track(t) }
        end
      end

      def empty_hash
        { artists: [], albums: [], tracks: [] }
      end

      def tag_data
        @tag_data ||= LastFM::Tag.call(@args)
      end
    end
  end
end
