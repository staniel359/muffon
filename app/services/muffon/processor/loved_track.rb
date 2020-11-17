module Muffon
  module Processor
    class LovedTrack < Muffon::Processor::Base
      def call
        process_loved_track
      end

    private

      def process_loved_track
        init_profile_track.tap do |t|
          t.loved = true
          t.loved_at = @args.loved_track[:loved_at]
          t.save
        end
      end

      def init_profile_track
        ::ProfileTrack.where(
          profile_id: @args.profile_id,
          track_id: track.id,
          profile_artist_id: profile_artist.id,
          artist_id: artist.id
        ).first_or_initialize
      end

      def track
        update_track(@args.loved_track.except(:loved_at), artist.id)
      end

      def artist
        @artist ||= update_artist(@args.loved_track[:artist])
      end

      def profile_artist
        ::ProfileArtist.where(
          profile_id: @args.profile_id,
          artist_id: artist.id
        ).first_or_create
      end
    end
  end
end
