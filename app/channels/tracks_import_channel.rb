class TracksImportChannel < ApplicationCable::Channel
  def subscribed
    stream_from "tracks_import_#{current_profile.id}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
