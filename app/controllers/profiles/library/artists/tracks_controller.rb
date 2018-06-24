module Profiles
  module Library
    module Artists
      class TracksController < Profiles::Library::ArtistsController
        def index
          @page_data = {
            title:  title,
            artist: artist,
            tracks: paginate(tracks, 20)
          }
        end

        def show
          @page_data = {
            title:  title,
            track:  track,
            albums: retrieve_albums,
            plays:  retrieve_plays
          }
        end

        def albums
          @page_data = {
            track:  track,
            albums: paginate(retrieve_albums, 20)
          }
        end

        def plays
          @page_data = {
            track: track,
            plays: paginate(retrieve_plays, 20)
          }
        end

      private

        def title
          t(
            "profiles.library.artists.tracks.#{params[:action]}",
            profile: profile.nickname,
            artist:  artist.artist_name,
            track:   track.track_title
          )
        end

        def tracks
          artist.profile_tracks.includes(:track).created_desc
        end

        def track
          @track ||= profile_tracks.find_by(
            'LOWER(artists.name) = ? AND LOWER(tracks.title) = ?',
            params[:artist_name].downcase,
            params[:track_title].downcase
          )
        end

        def profile_tracks
          profile.profile_tracks.joins(
            :track, profile_artist: :artist
          )
        end

        def retrieve_albums
          track.albums.includes(profile_album: :album).created_desc
        end

        def retrieve_plays
          track.plays.includes(
            profile_track: :track,
            profile_album: :album
          ).created_desc
        end
      end
    end
  end
end
