module Player
  class PlayingNow
    class << self
      def get(profile_id)
        $redis.get("#{profile_id}:playing_now")
      end

      def set(profile_id, track_id)
        $redis.set("#{profile_id}:playing_now", track_id)
      end

      def delete(profile_id)
        $redis.del("#{profile_id}:playing_now")
      end
    end
  end
end
