module Muffon
  module Stats
    class Artists < Muffon::Stats::Base
      def call
        super
      end

    private

      def retrieve_data
        scope.nil? ? all_artists : scoped_artists
      end

      def all_artists
        @profile.profile_artists.includes(
          :artist
        ).plays_count_desc.first(ARTISTS_LIMIT).map do |a|
          [a.artist.name, a.plays_count]
        end
      end

      def scoped_artists
        limited_artist_ids.map do |a|
          [artist(a[0]).name, a[1].length]
        end
      end

      def limited_artist_ids
        @limited_artist_ids ||=
          grouped_sorted_artists.first(ARTISTS_LIMIT)
      end

      def grouped_sorted_artists
        plays.pluck(:artist_id).group_by(
          &:itself
        ).sort_by { |_, v| v.length }.reverse
      end

      def plays
        @profile.plays.where(
          'created_at between ? and ?',
          start_date, end_date
        )
      end

      def artist(artist_id)
        artists.find { |a| a.id == artist_id }
      end

      def artists
        @artists ||= Artist.find(limited_artist_ids)
      end
    end
  end
end
