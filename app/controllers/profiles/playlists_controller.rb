module Profiles
  class PlaylistsController < ApplicationController
    def index
      @page_data = {
        title:     title,
        playlists: playlists
      }
    end

    def create
      create_playlist
      @page_data = {
        playlists: playlists
      }
    end

    def show
      @page_data = {
        title:    title,
        playlist: playlist,
        tracks:   playlist_tracks
      }
    end

    def edit
      check_correct_profile
      @page_data = {
        title:    title,
        playlist: playlist
      }
    end

    def update
      check_correct_profile
      @page_data = {
        playlist: playlist
      }
    end

    def destroy
      check_correct_profile
      playlist&.destroy
      redirect_to profile_playlists_path(id: current_profile.id)
    end

    def open_modal
      respond_with_js
    end

  private

    def title
      t(
        "playlists.#{params[:action]}",
        profile:  profile.nickname,
        playlist: playlist&.name
      )
    end

    def playlist
      @playlist ||= profile.playlists.find_by(
        name: params[:playlist_name]
      )
    end

    def playlists
      paginate(profile.playlists.created_desc, 20)
    end

    def create_playlist
      current_profile.playlists.create(playlist_params)
    end

    def playlist_params
      params.require(:playlist).permit(:profile_id, :name)
    end

    def playlist_tracks
      paginate(
        playlist.playlist_tracks.includes(
          :track, :artist, :album
        ).created_desc, 20
      )
    end
  end
end
