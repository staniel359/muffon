module Muffon
  module Stats
    class Data < Muffon::Stats::Base
      def call
        retrieve_stats
      end

    private

      def retrieve_stats
        return {} unless @profile.plays.present?

        stats_data_hash
      end

      def stats_data_hash
        stat_names.map do |s|
          ["#{s}_data".to_sym, stat_data(s)]
        end.to_h
      end

      def stat_names
        %w[
          plays artists tracks tags new_tracks
          new_artists tags_timeline
        ]
      end

      def stat_data(stat)
        "Muffon::Stats::#{stat.camelize}".constantize.call(@args)
      end
    end
  end
end
