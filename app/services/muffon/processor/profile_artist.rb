module Muffon
  module Processor
    class ProfileArtist < Muffon::Base
      def call
        process_profile_artist
      end

    private

      def process_profile_artist
        profile_artist.tap { profile_artist_attributes }
      end

      def profile_artist
        @profile_artist ||= ::ProfileArtist.where(
          profile_id: @args.profile_id,
          artist_id:  artist_id
        ).first_or_initialize
      end

      def artist_id
        @args.artist_id || artist.id
      end

      def artist
        Muffon::Processor::Artist.call(artist: artist_data)
      end

      def artist_data
        @args.artist || {}
      end

      def profile_artist_attributes
        profile_artist.created_at ||= @args.created_at
        profile_artist.save!
      end
    end
  end
end
