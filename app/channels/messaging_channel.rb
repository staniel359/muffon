class MessagingChannel < ApplicationCable::Channel
  def subscribed
    stream_from "messaging_#{current_profile.id}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
