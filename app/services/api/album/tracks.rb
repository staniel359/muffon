module API
  class Album
    class Tracks < Muffon::Processor::Base
      def call
        retrieve_tracks
      end

    private

      def retrieve_tracks
        tracks_data.map { |t| update_track(t) }
      end

      def tracks_data
        Muffon::Album::Tracks.call(@args)
      end
    end
  end
end
