class PlaylistsController < ApplicationController
  before_action :set_profile
  before_action :correct_profile, except: :index
  before_action :set_playlist, only: %i[show destroy]
  before_action :set_playlists, only: %i[index create destroy]

  def index
    @title = "#{@profile.nickname}'s playlists"
  end

  def create
    @playlists.create(playlist_params)

    respond_to do |format|
      format.js { render 'index', layout: false }
    end
  rescue ActiveRecord::RecordNotUnique
    flash.now[:danger] = 'You already have playlist with this name.'

    respond_to do |format|
      format.js { render 'playlist_flash', layout: false }
    end
  end

  def show
    @title = "#{@profile.nickname}'s playlists - #{@playlist.name}"
    @tracks = @playlist.playlist_tracks.includes(
      :track, :artist, :album
    ).page(params[:page]).per(10)
  end

  def destroy
    @playlist.destroy

    respond_to do |format|
      format.html { redirect_to playlists_path }
      format.js { render 'index', layout: false }
    end
  end

private

  def set_profile
    @profile ||= Profile.find(params[:id])
  end

  def set_playlist
    @playlist ||= Playlist.find_by_name(params[:playlist_name])
  end

  def set_playlists
    @playlists ||= @profile.playlists
  end

  def playlist_params
    params.require(:playlist).permit(:profile_id, :name)
  end

  def correct_profile
    redirect_to root_path unless current_profile?(@profile)
  end
end
