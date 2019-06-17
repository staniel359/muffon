module Muffon
  module Processor
    class SimilarTracks < Muffon::Processor::Base
      def call
        process_tracks
      end

    private

      def process_tracks
        return unless tracks_data.present?

        tracks_data.map { |t| update_track(t) }
      end

      def tracks_data
        @tracks_data ||=
          LastFM::Track::SimilarTracks.call(
            @args
          )[:similar_tracks]
      end
    end
  end
end
