class PlaylistsController < ApplicationController
  before_action :set_profile
  before_action :correct_profile, except: :index
  before_action :set_playlist, only: [:show, :destroy]

  def index
    @playlists = @profile.playlists
    @title = "#{@profile.nickname}'s playlists"
  end

  def new
    @playlist = @profile.playlists.build
    respond_to :js
  end

  def create
    @playlist = @profile.playlists.build(playlist_params)
    @playlist.save!
    respond_to :js
  end

  def show
    @tracks = @playlist.playlist_tracks
    @title = "#{@playlist.name} - #{@profile.nickname}'s playlists"
  end

  def destroy
    @playlist.destroy!
    respond_to :js
  end

  private

    def set_profile
      @profile = Profile.find(params[:profile_id])
    end

    def set_playlist
      @playlist = Playlist.find(params[:id])
    end

    def playlist_params
      params.require(:playlist).permit(:profile_id, :name)
    end

    def correct_profile
      redirect_to root_path unless current_profile?(@profile)
    end
end
