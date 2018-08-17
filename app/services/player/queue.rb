module Player
  class Queue
    class << self
      def tracks(profile_id)
        $redis.lrange("#{profile_id}:queue", 0, -1).uniq.map(&:to_i)
      end

      def add_tracks(profile_id, track_ids)
        $redis.rpush("#{profile_id}:queue", track_ids)
      end

      def delete_track(profile_id, track_id)
        $redis.lrem("#{profile_id}:queue", 0, track_id)
      end

      def clear(profile_id)
        $redis.del("#{profile_id}:queue")
      end
    end
  end
end
