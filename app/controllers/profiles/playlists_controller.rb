module Profiles
  class PlaylistsController < ApplicationController
    def index
      @page_data = {
        title:        title,
        profile:      profile,
        playlists:    playlists,
        new_playlist: new_playlist
      }
      respond_with_js_and_html
    end

    def create
      check_correct_profile
      if new_playlist.save
        redirect_to new_playlist
      else
        respond_with_js
      end
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

    def search_tracks
      @page_data = search_tracks_data
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

    def new_playlist
      current_profile.playlists.new
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

    def search_tracks_data
      Library::Search.call(
        profile_id: current_profile.id, q: params[:q]
      )
    end
  end
end
