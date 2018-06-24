module Player
  class Queue
    def add_tracks(profile_id, track_ids)
      redis.rpush("#{profile_id}:queue", track_ids)
    end

    def delete_track(profile_id, track_id)
      redis.lrem("#{profile_id}:queue", 0, track_id)
    end

    def clear(profile_id)
      redis.del("#{profile_id}:queue")
    end
  end
end
