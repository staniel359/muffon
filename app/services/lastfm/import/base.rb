module LastFM
  module Import
    class Base < LastFM::Base
    private

      def reset_counter(name)
        $redis.set(
          "#{@args.profile_id}:#{name}_current_count", 0
        )
      end

      def broadcast_import_start(phase)
        ActionCable.server.broadcast(
          "lastfm_data_import_#{@args.profile_id}",
          p: import_phases[phase]
        )
      end

      def import_phases
        {
          'plays' => 1,
          'loved_tracks' => 2,
          'tags' => 3,
          'recommendations' => 4
        }
      end

      def set_total_count(name, count)
        $redis.set(
          "#{@args.profile_id}:#{name}_total_count", count
        )
      end

      def broadcast_current_count(name)
        ActionCable.server.broadcast(
          "lastfm_data_import_#{@args.profile_id}",
          p: import_phases[name],
          c: increment_counter(name),
          t: get_total_count(name).to_i
        )
      end

      def get_total_count(name)
        $redis.get(
          "#{@args.profile_id}:#{name}_total_count"
        )
      end

      def increment_counter(name)
        $redis.incr(
          "#{@args.profile_id}:#{name}_current_count"
        )
      end

      def delete_counter(name)
        $redis.del(
          "#{@args.profile_id}:#{name}_current_count"
        )
        $redis.del(
          "#{@args.profile_id}:#{name}_total_count"
        )
      end
    end
  end
end
