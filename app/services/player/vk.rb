module Player
  class VK
    class << self
      def set_track_ids(profile_id, track_ids)
        $redis.set("#{profile_id}:vk_track_ids", track_ids)
      end

      def track_ids(profile_id)
        $redis.lrange("#{profile_id}:vk_track_ids", 0, -1)
      end

      def delete_played_track_id(profile_id, track_id)
        $redis.lrem("#{profile_id}:vk_track_ids", 0, track_id)
      end

      def set_playing_now_id(profile_id, track_id)
        $redis.set("#{profile_id}:playing_now_id", track_id)
      end

      def playing_now_id(profile_id)
        $redis.get("#{profile_id}:playing_now_id")
      end

      def clear(profile_id)
        $redis.del("#{profile_id}:playing_now_id")
        $redis.del("#{profile_id}:vk_track_ids")
      end
    end
  end
end
