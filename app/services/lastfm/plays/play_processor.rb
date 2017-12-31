module Lastfm
  module Plays
    class PlayProcessor < Service
      def call
        process_play
      end

    private

      def process_play
        Play.where(play_params).first_or_create
      end

      def play_params
        {
          profile_id: @profile.id,
          track_id: track.id,
          profile_track_id: profile_track.id,
          album_id: album&.id,
          profile_album_id: profile_album&.id,
          artist_id: artist.id,
          profile_artist_id: profile_artist.id,
          created_at: play_created_at
        }
      end

      def track
        @track ||= Track.where(
          title: play['name'],
          artist_id: artist.id
        ).first_or_initialize.tap { |h| track_params(h) }
      end

      def play
        @play ||= @args.play
      end

      def track_params(h)
        h.mbid = play['mbid']
        h.albums |= [album.id] if album.present?
        h.save
      end

      def artist
        @artist ||= ::Artist.where(
          name: play['artist']['name']
        ).first_or_create(
          image: play['artist']['image'][3]['#text'],
          mbid: play['artist']['mbid']
        )
      end

      def album
        return nil if play['album']['#text'].blank?

        @album ||= ::Album.where(
          title: play['album']['#text'],
          artist_id: artist.id
        ).first_or_create(
          cover: play['image'][3]['#text'],
          mbid: play['album']['mbid']
        )
      end

      def profile_track
        @profile_track ||= ProfileTrack.where(
          track_id: track.id,
          profile_id: @profile.id,
          artist_id: artist.id,
          profile_artist_id: profile_artist.id
        ).first_or_initialize.tap do |h|
          profile_track_params(h)
          if profile_album.present?
            profile_album.profile_tracks |= [h.id]
            profile_album.save
          end
        end
      end

      def profile_track_params(h)
        h.loved = play['loved'].to_i
        h.albums |= [album.id] if album.present?
        h.profile_albums |= [profile_album.id] if profile_album.present?
        h.created_at = play_created_at if h.created_at.nil?
        h.save
      end

      def profile_artist
        @profile_artist ||= ProfileArtist.where(
          artist_id: artist.id,
          profile_id: @profile.id
        ).first_or_initialize.tap do |h|
          h.created_at = play_created_at if h.created_at.nil?
          h.save
        end
      end

      def profile_album
        return nil if album.nil?

        @profile_album ||= ProfileAlbum.where(
          album_id: album.id,
          profile_id: @profile.id
        ).first_or_initialize.tap { |h| profile_album_params(h) }
      end

      def profile_album_params(h)
        h.profile_artist_id = profile_artist.id
        h.artist_id = artist.id
        h.created_at = play_created_at if h.created_at.nil?
        h.save
      end

      def play_created_at
        @play_created_at ||= Time.zone.at(
          play['date']['uts'].to_i
        ).to_time
      end
    end
  end
end
