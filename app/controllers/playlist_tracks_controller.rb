class PlaylistTracksController < ApplicationController
  def new
    respond_to :js
  end

  def search
    @search_results = current_profile.profile_tracks.joins(:track).joins(:artist).where('lower(title) like lower(?) or lower(name) like lower(?)', "%#{params[:title]}%", "%#{params[:title]}%").select('profile_tracks.id as id, tracks.id as track_id, tracks.title as title, artists.name as artist_name, artists.image as image') unless params[:title] == ''
    respond_to :js
  end

  def create
    @playlist_track = PlaylistTrack.create!(profile_track_id: params[:track_id], playlist_id: params[:playlist_id])
    respond_to :js
  end

  def destroy
    current_profile.playlist_tracks.find(params[:id]).destroy!
    respond_to :js
  end
end
