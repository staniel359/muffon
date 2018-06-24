module Muffon
  module Processor
    class ProfileAlbum < Muffon::Base
      def call
        process_profile_album
      end

    private

      def process_profile_album
        return unless album_id.present? && profile_artist_id.present?

        profile_album.tap { profile_album_attributes }
      end

      def album_id
        @args.album_id || album&.id
      end

      def album
        @album ||= Muffon::Processor::Album.call(album: @args.album)
      end

      def profile_artist_id
        @profile_artist_id ||=
          @args.profile_artist_id || profile_artist.id
      end

      def profile_artist
        Muffon::Processor::ProfileArtist.call(
          profile_id: @args.profile_id,
          artist_id:  album.artist_id,
          created_at: @args.track[:created_at]
        )
      end

      def profile_album
        @profile_album ||= ::ProfileAlbum.where(
          profile_id:        @args.profile_id,
          album_id:          album_id,
          profile_artist_id: profile_artist_id
        ).first_or_initialize
      end

      def profile_album_attributes
        profile_album.created_at ||= @args.track[:created_at]
        profile_album.save
      end
    end
  end
end
