module API
  class Artist
    class Tracks < Muffon::Processor::Base
      def call
        retrieve_tracks
      end

    private

      def retrieve_tracks
        tracks_data.map { |t| update_track(t) }
      end

      def tracks_data
        LastFM::Artist::Tracks.call(@args)[:tracks]
      end
    end
  end
end
