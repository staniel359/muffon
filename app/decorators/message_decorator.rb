class MessageDecorator < Draper::Decorator
  delegate_all

  def sent_from(profile_id)
    object.profile_id == profile_id
  end

  def tracks
    Track.find(track_ids)
  end
end
