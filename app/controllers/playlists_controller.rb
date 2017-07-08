class PlaylistsController < ApplicationController
  before_action :set_profile, only: [:index, :show]
  before_action :set_playlist, only: [:show, :destroy]
  before_action :correct_profile, only: [:destroy]

  def index
    @playlists = @profile.playlists
    @title = "#{@profile.nickname}'s playlists"
  end

  def new
    @playlist = current_profile.playlists.build
    respond_to :js
  end

  def create
    @playlist = current_profile.playlists.build(playlist_params)
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
      redirect_to root_path unless current_profile?(Profile.find(params[:profile_id]))
    end
end
