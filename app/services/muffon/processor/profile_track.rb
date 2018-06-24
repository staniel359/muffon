module Muffon
  module Processor
    class ProfileTrack < Muffon::Base
      def call
        process_profile_track
      end

    private

      def process_profile_track
        return unless track_id.present? && profile_artist_id.present?

        profile_track.tap { profile_track_attributes }
      end

      def track_id
        @args.track_id || track.id
      end

      def track
        @track ||= Muffon::Processor::Track.call(track: @args.track)
      end

      def profile_artist_id
        @profile_artist_id ||=
          @args.profile_artist_id || profile_artist.id
      end

      def profile_artist
        Muffon::Processor::ProfileArtist.call(
          profile_id: @args.profile_id,
          artist_id:  track.artist_id,
          created_at: @args.track[:created_at]
        )
      end

      def profile_track
        @profile_track ||= ::ProfileTrack.where(
          profile_id:        @args.profile_id,
          track_id:          track_id,
          profile_artist_id: profile_artist_id
        ).first_or_initialize
      end

      def profile_track_attributes
        profile_track.loved        = @args.track[:loved_at].present?
        profile_track.loved_at     = @args.track[:loved_at]
        profile_track.created_at ||= @args.track[:created_at]
        profile_track.save
      end
    end
  end
end
