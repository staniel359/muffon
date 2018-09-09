module Profiles
  class PlaylistsController < ApplicationController
    before_action :set_profile

    def index
      set_playlists
      set_title
      set_new_playlist
    end

    def create
      set_new_playlist
      create_playlist
    end

    def show
      set_playlist
      set_title
      set_playlist_tracks
    end

    def update
      set_playlist
      check_correct_profile
      update_playlist
    end

    def destroy
      set_playlist
      check_correct_profile
      delete_playlist
    end

  private

    def set_playlists
      @playlists = paginate(
        @profile.playlists.created_desc, 20
      )
    end

    def set_title
      @title = t(
        "profiles.playlists.#{params[:action]}",
        profile:  @profile.nickname,
        playlist: @playlist&.name
      )
    end

    def set_new_playlist
      @new_playlist = current_profile.playlists.new
    end

    def create_playlist
      if @new_playlist.update(playlist_params)
        redirect_to_playlist(@new_playlist.name)
      else
        respond_with_js
      end
    end

    def playlist_params
      params.require(:playlist).permit(:profile_id, :name)
    end

    def redirect_to_playlist(name)
      redirect_to profiles_playlist_path(playlist_name: name)
    end

    def set_playlist
      @playlist = @profile.playlists.find_by(
        name: params[:playlist_name]
      )
    end

    def set_playlist_tracks
      @tracks = paginate(
        @playlist.playlist_tracks.associated.created_asc, 20
      )
    end

    def update_playlist
      if @playlist.update(playlist_params)
        redirect_to_playlist(@playlist.name)
      else
        respond_with_js
      end
    end

    def delete_playlist
      @playlist&.destroy
      redirect_to profiles_playlists_path(current_profile)
    end
  end
end
