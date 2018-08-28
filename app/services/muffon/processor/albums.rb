module Muffon
  module Processor
    class Albums < Muffon::Processor::Base
      def call
        process_albums
      end

    private

      def process_albums
        return [] unless albums_data.present?

        albums_data.map { |a| process_album(a) }
      end

      def albums_data
        @args.albums
      end

      def process_album(album)
        Muffon::Processor::Album.call(album: album)
      end
    end
  end
end
