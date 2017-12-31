module PlayerHelper
  def get_playing_now_track
    Vk::GetTrack.call(
      vk_id: @redis.get("#{current_profile&.id}:playing_now_id")
    )
  end

  def playing_now_track
    @playing_now_track ||= Track.find_by(
      id: @redis.get("#{current_profile&.id}:playing_now")
    )
  end

  def profile_playing_now_track
    @profile_playing_now_track ||= Track.find_by(
      id: @redis.get("#{@profile&.id}:playing_now")
    )
  end

  def enqueued_tracks
    @enqueued_tracks ||= Track.includes(:artist).find(
      @redis.lrange(
        "#{current_profile.id}:queue", 0, -1
      ).map(&:to_i)
    )
  end
end
