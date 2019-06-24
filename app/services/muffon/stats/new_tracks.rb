module Muffon
  module Stats
    class NewTracks < Muffon::Stats::Base
      def call
        super
      end

    private

      def retrieve_data
        scope.nil? ? all_tracks : scoped_grouped_tracks
      end

      def all_tracks
        @profile.profile_tracks.group_by_month(:created_at).count
      end

      def scoped_grouped_tracks
        tracks.send(
          "group_by_#{scope_groupings[scope]}", :created_at
        ).count
      end

      def tracks
        @profile.profile_tracks.where(
          'created_at between ? and ?',
          start_date, end_date
        )
      end
    end
  end
end
