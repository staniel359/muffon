module Muffon
  module Processor
    class Play < Muffon::Processor::Base
      def call
        process_play
        connect_tracks_with_albums
      end

    private

      def process_play
        ::Play.where(play_attributes).first_or_create!
      end

      def play_attributes
        {
          profile_id:        @args.profile_id,
          profile_artist_id: profile_artist.id,
          artist_id:         profile_artist.artist_id,
          profile_track_id:  profile_track.id,
          track_id:          profile_track.track_id,
          profile_album_id:  profile_album&.id,
          album_id:          profile_album&.album_id,
          created_at:        @args.play[:created_at]
        }
      end

      def profile_artist
        @profile_artist ||=
          init_profile_artist.tap { |a| update_timestamp(a) }
      end

      def init_profile_artist
        ::ProfileArtist.where(
          profile_id: @args.profile_id,
          artist_id:  artist_id
        ).first_or_initialize
      end

      def update_timestamp(attr)
        attr.created_at ||= @args.play[:created_at]
        attr.save
      end

      def artist_id
        @artist_id ||= update_artist(artist_data).id
      end

      def artist_data
        @args.play[:artist].tap do |h|
          h.merge!(tag_ids: tag_ids) unless
              init_artist(h).tag_ids.present?
        end
      end

      def tag_ids
        artist_tags.map { |t| process_tag(t[:name]) }.pluck(:id)
      end

      def artist_tags
        LastFM::Tags.call(
          model_name:  'artist',
          artist_name: @args.play[:artist][:name]
        ).first(5)
      end

      def profile_track
        @profile_track ||=
          init_profile_track.tap { |t| update_timestamp(t) }
      end

      def init_profile_track
        ::ProfileTrack.where(
          profile_id:        @args.profile_id,
          track_id:          track_id,
          profile_artist_id: profile_artist.id,
          artist_id:         artist_id
        ).first_or_initialize
      end

      def track_id
        update_track(@args.play, artist_id).id
      end

      def profile_album
        return unless @args.play[:album].present?

        @profile_album ||=
          init_profile_album.tap { |a| update_timestamp(a) }
      end

      def init_profile_album
        ::ProfileAlbum.where(
          profile_id:        @args.profile_id,
          album_id:          album_id,
          profile_artist_id: profile_artist.id,
          artist_id:         artist_id
        ).first_or_initialize
      end

      def album_id
        update_album(@args.play[:album], artist_id).id
      end

      def connect_tracks_with_albums
        return unless profile_album.present?

        profile_track.update(profile_album_ids: profile_album_ids)
        profile_track.track.update(album_ids: album_ids)
        profile_album.update(profile_track_ids: profile_track_ids)
      end

      def profile_album_ids
        profile_track.profile_album_ids |= [profile_album.id].compact
      end

      def album_ids
        profile_track.track.album_ids |= [profile_album.album_id].compact
      end

      def profile_track_ids
        profile_album.profile_track_ids |= [profile_track.id].compact
      end
    end
  end
end
