module Player
  class QueueController < ApplicationController
    def send
      send_to_queue
      respond_with_js
    end

    def delete
      delete_from_queue
      respond_with_js
    end

    def clear
      clear_queue
      respond_with_js
    end

  private

    def send_to_queue
      ::Player::Queue.add_tracks(
        current_profile.id, params[:track_ids]
      )
    end

    def delete_from_queue
      ::Player::Queue.delete_track(
        current_profile.id, params[:track_id]
      )
    end

    def clear_queue
      ::Player::Queue.clear(current_profile.id)
    end
  end
end
