class ListenedArtistsController < ApplicationController
  before_action :set_object

  def create
    add_listened_artist
    delete_artist_recommendation
    respond_with_js
  end

  def destroy
    delete_listened_artist
    restore_artist_recommendation
    respond_with_js
  end

private

  def set_object
    @object = Artist.find_by(id: params[:artist_id])
  end

  def add_listened_artist
    current_profile.listened_artists.where(
      artist_id: @object.id
    ).first_or_create
  end

  def delete_artist_recommendation
    artist_recommendation&.update(deleted: true)
  end

  def artist_recommendation
    current_profile.recommendations.find_by(
      artist_id: @object.id
    )
  end

  def delete_listened_artist
    current_profile.listened_artists.find_by(
      artist_id: @object.id
    )&.destroy
  end

  def restore_artist_recommendation
    artist_recommendation&.update(deleted: false)
  end
end
