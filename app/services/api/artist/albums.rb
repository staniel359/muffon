module API
  class Artist
    class Albums < Muffon::Processor::Base
      def call
        retrieve_albums
      end

    private

      def retrieve_albums
        albums_data.map { |t| update_album(t) }
      end

      def albums_data
        LastFM::Artist::Albums.call(@args)[:albums]
      end
    end
  end
end
