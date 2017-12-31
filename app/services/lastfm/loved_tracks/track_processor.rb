module Lastfm
  module LovedTracks
    class TrackProcessor < Service
      def call
        process_track
      end

    private

      def process_track
        profile_track&.update(loved_at: loved_at)
      end

      def profile_track
        @profile_track ||= @profile.profile_tracks.find_by(
          track_id: track&.id
        )
      end

      def track
        Track.find_by(
          title: @args.track['name'],
          artist_id: artist&.id
        )
      end

      def artist
        ::Artist.find_by_name(
          @args.track['artist']['name']
        )
      end

      def loved_at
        Time.zone.at(
          @args.track['date']['uts'].to_i
        ).localtime.to_time
      end
    end
  end
end
