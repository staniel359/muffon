module PlayerHelper
  def playing_now?(track_id)
    track_id == playing_now_track_id
  end

  def playing_now_track_id
    Player::PlayingNow.get(current_profile&.id)
  end

  def playing_now_track
    Track.find_by(id: playing_now_track_id)
  end

  def playing_now_track_link
    VK::Track.call(vk_id: current_track_vk_id) || ''
  end

  def enqueued_tracks
    Player::Queue.tracks(current_profile.id)
  end

  def previous_track
    return unless playing_now_track.present? && source.present?
    return if previous_track_position.negative?

    Track.find_by(id: list_tracks[previous_track_position])
  end

  def next_track
    return unless playing_now_track.present? && source.present?
    return if next_track_position > source_tracks.length

    Track.find_by(id: list_tracks[next_track_position])
  end

private

  def current_track_vk_id
    Player::VK.playing_now_id(current_profile.id)
  end

  def source
    Player::Source.get(current_profile.id)
  end

  def previous_track_position
    source_track_position - 1
  end

  def source_track_position
    source_tracks.find_index(playing_now_track.id)
  end

  def source_tracks
    source_model.find_by(id: source_model_id).track_ids
  end

  def source_model
    source.split('_')[0].camelize.constantize
  end

  def source_model_id
    source.split('_')[1]
  end

  def next_track_position
    source_track_position + 1
  end
end
