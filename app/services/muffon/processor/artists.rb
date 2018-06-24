module Muffon
  module Processor
    class Artists < Muffon::Base
      def call
        process_artists
      end

    private

      def process_artists
        return [] unless artists_data.present?

        artists_data.map { |a| process_artist(a) }
      end

      def artists_data
        @args.artists
      end

      def process_artist(artist)
        Muffon::Processor::Artist.call(artist: artist)
      end
    end
  end
end
