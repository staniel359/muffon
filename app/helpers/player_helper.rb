module PlayerHelper
  def get_playing_now_track
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
end
