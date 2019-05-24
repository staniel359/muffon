module Profiles
  module Library
    module Artists
      class PlaysController < Profiles::Library::ArtistsController
        before_action :set_profile, :set_artist

        def index
          set_plays
          set_title
        end

      private

        def set_title
          @title = t(
            "profiles.library.artists.plays.#{params[:action]}",
            profile: @profile.nickname,
            artist: @artist.name
          )
        end

        def set_plays
          @plays = paginate(
            @artist.plays.associated.created_desc, 20
          )
        end
      end
    end
  end
end
