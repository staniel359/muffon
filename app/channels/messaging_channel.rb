class MessagingChannel < ApplicationCable::Channel
  def subscribed
    stream_from "messaging_#{current_profile.id}" if broadcast?
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

private

  def broadcast?
    current_profile.present?
  end
end
