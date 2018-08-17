module Muffon
  module Processor
    class ProfileTrack < Muffon::Base
      def call
        process_profile_track
      end

    private

      def process_profile_track
        profile_track.tap { profile_track_attributes }
      end

      def profile_track
        @profile_track ||= ::ProfileTrack.where(
          profile_id:        @args.profile_id,
          track_id:          track_id,
          profile_artist_id: profile_artist_id,
          artist_id:         track.artist_id
        ).first_or_initialize
      end

      def track_id
        @args.track_id || track.id
      end

      def track
        @track ||= Muffon::Processor::Track.call(track: track_data)
      end

      def track_data
        @track_data ||= @args.track || custom_track_data
      end

      def profile_artist_id
        @profile_artist_id ||=
          @args.profile_artist_id || profile_artist.id
      end

      def profile_artist
        Muffon::Processor::ProfileArtist.call(
          profile_id: @args.profile_id,
          artist_id:  track.artist_id,
          created_at: created_at
        )
      end

      def created_at
        track_data[:created_at]
      end

      def profile_track_attributes
        profile_track.loved           ||= loved_at.present?
        profile_track.loved_at        ||= loved_at
        profile_track.created_at      ||= created_at
        profile_track.save!
      end

      def loved_at
        track_data[:loved_at]
      end
    end
  end
end
