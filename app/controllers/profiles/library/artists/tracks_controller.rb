module Profiles
  module Library
    module Artists
      class TracksController < Profiles::Library::ArtistsController
        before_action :set_profile, :set_artist
        before_action :set_track, except: :index
        before_action :set_title

        def index
          @pagy, @tracks = pagy(tracks)
        end

        def show
          @albums = track_albums.limit(3).decorate
          @plays = track_plays.limit(10).decorate
        end

        def albums
          @pagy, @albums = pagy(track_albums)
        end

        def plays
          @pagy, @plays = pagy(track_plays)
        end

      private

        def set_title
          @title = t(
            "profiles.library.artists.tracks.#{params[:action]}",
            profile: @profile.nickname,
            artist:  @artist.name,
            track:   @track&.title
          )
        end

        def set_track
          @track = @profile.profile_tracks.joins(
            'JOIN "tracks" ON "tracks"."id" = "profile_tracks"."track_id"'
          ).joins(
            'JOIN "artists" ON "artists"."id" = "profile_tracks"."artist_id"'
          ).find_by(
            'LOWER(artists.name) = ? AND LOWER(tracks.title) = ?',
            params[:artist_name].downcase, params[:track_title].downcase
          ).decorate
        end

        def tracks
          @artist.profile_tracks.includes(
            :artist, [track: :artist]
          ).created_desc
        end

        def track_albums
          @track.profile_albums.created_desc
        end

        def track_plays
          @track.plays.created_desc
        end
      end
    end
  end
end
