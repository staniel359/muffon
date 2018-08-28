module Profiles
  module Library
    module Artists
      class AlbumsController < Profiles::Library::ArtistsController
        before_action :set_profile, :set_artist
        before_action :set_album, except: :index
        before_action :set_title

        def index
          @pagy, @albums = pagy(albums)
        end

        def show
          @tracks = album_tracks.limit(5).decorate
          @plays = album_plays.limit(10).decorate
        end

        def tracks
          @pagy, @tracks = pagy(album_tracks)
        end

        def plays
          @pagy, @plays = pagy(album_plays)
        end

      private

        def set_title
          @title = t(
            "profiles.library.artists.albums.#{params[:action]}",
            profile: @profile.nickname,
            artist:  @artist.name,
            album:   @album&.title
          )
        end

        def albums
          @artist.profile_albums.plays_count_desc
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

        def album_tracks
          @album.profile_tracks.plays_count_desc
        end

        def album_plays
          @album.plays.created_desc
        end
      end
    end
  end
end
