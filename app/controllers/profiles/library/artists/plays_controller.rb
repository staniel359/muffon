module Profiles
  module Library
    module Artists
      class PlaysController < Profiles::Library::ArtistsController
        before_action :set_profile, :set_artist, :set_title

        def index
          @pagy, @plays = pagy(plays)
        end

      private

        def set_title
          @title = t(
            "profiles.library.artists.plays.#{params[:action]}",
            profile: @profile.nickname,
            artist:  @artist.name
          )
        end

        def plays
          @artist.plays.created_desc
        end
      end
    end
  end
end
