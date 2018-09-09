module Player
  class VK
    class << self
      def set_track_ids(profile_id, track_ids)
        if track_ids.any?
          $redis.rpush("#{profile_id}:vk_track_ids", track_ids)
        else
          $redis.del("#{profile_id}:vk_track_ids")
        end
      end

      def get_track_ids(profile_id)
        $redis.lrange("#{profile_id}:vk_track_ids", 0, -1)
      end

      def delete_wrong_track_id(profile_id, track_id)
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
