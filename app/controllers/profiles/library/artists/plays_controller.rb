module Profiles
  module Library
    module Artists
      class PlaysController < Profiles::Library::ArtistsController
        def index
          @page_data = {
            title:  title,
            artist: artist,
            plays:  paginate(plays, 20)
          }
        end

      private

        def title
          t(
            "profiles.library.artists.plays.#{params[:action]}",
            profile: profile.nickname,
            artist:  artist.artist_name
          )
        end

        def plays
          artist.plays.includes(
            profile_track: :track,
            profile_album: :album
          ).created_desc
        end
      end
    end
  end
end
