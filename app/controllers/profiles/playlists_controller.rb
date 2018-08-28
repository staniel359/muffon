module Profiles
  class PlaylistsController < ApplicationController
    before_action :set_profile
    before_action :set_new_playlist, only: %i[index create]
    before_action :set_playlist, :check_correct_profile,
                  only: %i[show update destroy]
    before_action :set_title

    def index
      @playlists = paginate(playlists, 20)
    end

    def create
      if @new_playlist.update(playlist_params)
        redirect_to_playlist
      else
        respond_with_js
      end
    end

    def show
      @tracks = paginate(playlist_tracks, 20)
    end

    def update
      if @playlist.update(playlist_params)
        redirect_to @playlist
      else
        respond_with_js
      end
    end

    def destroy
      @playlist&.destroy
      redirect_to profiles_playlists_path(current_profile)
    end

  private

    def set_title
      @title = t(
        "profiles.playlists.#{params[:action]}",
        profile:  @profile.nickname,
        playlist: @playlist&.name
      )
    end

    def set_playlist
      @playlist = @profile.playlists.find_by(
        name: params[:playlist_name]
      )
    end

    def set_new_playlist
      @new_playlist = current_profile.playlists.new
    end

    def playlists
      @profile.playlists.created_desc
    end

    def playlist_params
      params.require(:playlist).permit(:profile_id, :name)
    end

    def redirect_to_playlist
      redirect_to profiles_playlist_path(playlist_name: @new_playlist.name)
    end

    def playlist_tracks
      @playlist.playlist_tracks.includes(
        :artist, [track: :artist], :album
      ).created_asc
    end
  end
end
