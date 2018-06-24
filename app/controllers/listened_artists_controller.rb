module ArtistActions
  class ListenedArtistsController < ApplicationController
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

    def add_listened_artist
      current_profile.listened_artists.create(
        artist_id: params[:artist_id]
      )
    end

    def delete_artist_recommendation
      artist_recommendation&.update(deleted: true)
    end

    def artist_recommendation
      current_profile.recommendations.find_by(
        artist_id: params[:artist_id]
      )
    end

    def delete_listened_artist
      current_profile.listened_artists.find_by(
        artist_id: params[:artist_id]
      )&.destroy
    end

    def restore_artist_recommendation
      artist_recommendation&.update(deleted: false)
    end
  end
end
