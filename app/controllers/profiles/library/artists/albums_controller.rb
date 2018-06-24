module Profiles
  module Library
    module Artists
      class AlbumsController < Profiles::Library::ArtistsController
        def index
          @page_data = {
            title:  title,
            artist: artist,
            albums: paginate(albums, 20)
          }
        end

        def show
          @page_data = {
            title:  title,
            album:  album,
            tracks: retrieve_tracks,
            plays:  retrieve_plays
          }
        end

        def tracks
          @page_data = {
            album:  album,
            tracks: paginate(retrieve_tracks, 20)
          }
        end

        def plays
          @page_data = {
            album: album,
            plays: paginate(retrieve_plays, 20)
          }
        end

      private

        def title
          t(
            "profiles.library.artists.albums.#{params[:action]}",
            profile: profile.nickname,
            artist:  artist.artist_name,
            album:   album.album_title
          )
        end

        def albums
          artist.profile_albums.includes(:album).created_desc
        end

        def album
          @album ||= profile_albums.find_by(
            'LOWER(artists.name) = ? AND LOWER(albums.title) = ?',
            params[:artist_name].downcase,
            params[:album_title].downcase
          )
        end

        def profile_albums
          profile.profile_albums.joins(
            :album, profile_artist: :artist
          )
        end

        def retrieve_tracks
          album.tracks.includes(profile_track: :track).created_desc
        end

        def retrieve_plays
          album.plays.includes(
            profile_track: :track,
            profile_album: :album
          ).created_desc
        end
      end
    end
  end
end
