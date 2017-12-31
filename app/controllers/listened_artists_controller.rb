class ListenedArtistsController < ApplicationController
  before_action :set_artist

  def create
    current_profile.listened_artists.create(
      artist_id: params[:artist_id]
    )
    current_profile.recommendations.find_by(
      artist_id: params[:artist_id]
    )&.update(deleted: 1)

    respond_to { |format| format.js { render layout: false } }
  end

  def destroy
    current_profile.listened_artists.find_by(
      artist_id: params[:artist_id]
    )&.destroy
    current_profile.recommendations.find_by(
      artist_id: params[:artist_id]
    )&.update(deleted: nil)

    respond_to { |format| format.js { render layout: false } }
  end

private

  def set_artist
    @artist = Artist.find(params[:artist_id])
  end
end
