module Muffon
  module Stats
    class Plays < Muffon::Stats::Base
      def call
        super
      end

    private

      def retrieve_data
        scope.nil? ? all_plays : scoped_grouped_plays
      end

      def all_plays
        @profile.plays.group_by_month(:created_at).count
      end

      def scoped_grouped_plays
        plays.send(
          "group_by_#{scope_groupings[scope]}", :created_at
        ).count
      end

      def plays
        @profile.plays.where(
          'created_at between ? and ?',
          start_date, end_date
        )
      end
    end
  end
end
