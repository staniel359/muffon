module PlayerHelper
  def retrieve_playing_now_track
    Vk::GetTrack.call(
      vk_id: @redis.get("#{current_profile&.id}:playing_now_id")
    )
  end

  def playing_now_track
    return if playing_now_track_id.zero?

    @playing_now_track ||= Track.find_by(
      id: playing_now_track_id
    )
  end

  def playing_now_track_id
    return 0 unless logged_in?

    @redis.get("#{current_profile.id}:playing_now").to_i
  end

  def profile_playing_now_track
    @profile_playing_now_track ||= Track.find_by(
      id: @redis.get("#{@profile&.id || current_profile.id}:playing_now")
    )
  end

  def enqueued_tracks
    @enqueued_tracks ||= Track.includes(:artist).find(
      @redis.lrange(
        "#{current_profile.id}:queue", 0, -1
      ).uniq.map(&:to_i)
    )
  end

  def previous_track
    return unless playing_now_track.present? && from_list.present?
    return if (list_track_position - 1).negative?

    Track.find_by(id: list_tracks[list_track_position - 1])
  end

  def next_track
    return unless playing_now_track.present? && from_list.present?

    Track.find_by(id: list_tracks[list_track_position + 1])
  end

  def from_list
    @redis.get("#{current_profile.id}:from")
  end

  def list_track_position
    list_tracks.find_index(playing_now_track.id)
  end

  def list_tracks
    @list_tracks ||= list_model.find_by(id: list_model_id).track_ids
  end

  def list_model
    from_list.split('_')[0].camelize.constantize
  end

  def list_model_id
    from_list.split('_')[1]
  end
end
