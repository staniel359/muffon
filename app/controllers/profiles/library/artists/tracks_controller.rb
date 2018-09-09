module Profiles
  module Library
    module Artists
      class TracksController < Profiles::Library::ArtistsController
        before_action :set_profile, :set_artist

        def index
          set_tracks
          set_title
        end

        def show
          set_track
          set_title
          set_track_albums
          set_track_plays
        end

        def albums
          set_track
          set_title
          set_track_albums
        end

        def plays
          set_track
          set_title
          set_track_plays
        end

      private

        def set_tracks
          @tracks = paginate(
            @artist.profile_tracks.associated.plays_count_desc, 20
          )
        end

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

        def set_track_albums
          @albums = paginate(
            @track.profile_albums.associated.plays_count_desc, 20
          )
        end

        def set_track_plays
          @plays = paginate(
            @track.plays.associated.created_desc, 20
          )
        end
      end
    end
  end
end
