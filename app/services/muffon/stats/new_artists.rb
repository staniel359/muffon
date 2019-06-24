module Muffon
  module Stats
    class NewArtists < Muffon::Stats::Base
      def call
        super
      end

    private

      def retrieve_data
        scope.nil? ? all_artists : scoped_grouped_artists
      end

      def all_artists
        @profile.profile_artists.group_by_month(:created_at).count
      end

      def scoped_grouped_artists
        artists.send(
          "group_by_#{scope_groupings[scope]}", :created_at
        ).count
      end

      def artists
        @profile.profile_artists.where(
          'created_at between ? and ?',
          start_date, end_date
        )
      end
    end
  end
end
