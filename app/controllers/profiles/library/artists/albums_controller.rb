module Profiles
  module Library
    module Artists
      class AlbumsController < Profiles::Library::ArtistsController
        before_action :set_profile, :set_artist

        def index
          set_albums
          set_title
        end

        def show
          set_album
          set_title
          set_album_tracks
          set_album_plays
        end

        def tracks
          set_album
          set_title
          set_album_tracks
        end

        def plays
          set_album
          set_title
          set_album_plays
        end

      private

        def set_title
          @title = t(
            "profiles.library.artists.albums.#{params[:action]}",
            profile: @profile.nickname,
            artist: @artist.name,
            album: @album&.title
          )
        end

        def set_albums
          @albums = paginate(
            @artist.profile_albums.associated.plays_count_desc, 20
          )
        end

        def set_album
          @album = @profile.profile_albums.joins(
            'JOIN "albums" ON "albums"."id" = "profile_albums"."album_id"'
          ).joins(
            'JOIN "artists" ON "artists"."id" = "profile_albums"."artist_id"'
          ).find_by(
            'LOWER(artists.name) = ? AND LOWER(albums.title) = ?',
            params[:artist_name].downcase, params[:album_title].downcase
          ).decorate
        end

        def set_album_tracks
          @tracks = paginate(
            @album.profile_tracks.associated.plays_count_desc, 20
          )
        end

        def set_album_plays
          @plays = paginate(
            @album.plays.associated.created_desc, 20
          )
        end
      end
    end
  end
end
