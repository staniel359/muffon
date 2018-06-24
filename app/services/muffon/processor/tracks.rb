module Muffon
  module Processor
    class Tracks < Muffon::Base
      def call
        process_tracks
      end

    private

      def process_tracks
        return [] unless tracks_data.present?

        tracks_data.map { |t| process_track(t) }
      end

      def tracks_data
        @args.tracks
      end

      def process_track(track)
        Muffon::Processor::Track.call(
          track:     track,
          artist_id: @args.artist_id,
          album_id:  @args.album_id
        )
      end
    end
  end
end
