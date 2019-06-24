module Muffon
  module Stats
    class Tags < Muffon::Stats::Base
      def call
        super
      end

    private

      def retrieve_data
        tag_ids_count_limited.map do |t|
          [tag_name_by_id(t[0]), t[1]]
        end
      end

      def tag_ids_count_limited
        @tag_ids_count_limited ||=
          tag_ids_count_sorted.first(10)
      end

      def tag_ids_count_sorted
        tag_ids_count.sort_by(&:second).reverse
      end

      def tag_ids_count
        tag_ids_grouped.map { |t, c| [t, c.length] }
      end

      def tag_ids_grouped
        plays.pluck(:tag_ids).flatten.group_by(&:itself)
      end

      def plays
        scope.nil? ? all_plays : scoped_plays
      end

      def all_plays
        @profile.plays.joins(:artist).select(
          'artists.tag_ids, plays.created_at'
        )
      end

      def scoped_plays
        all_plays.where(
          'plays.created_at between ? and ?',
          start_date, end_date
        )
      end

      def tag_name_by_id(tag_id)
        tags.find { |t| t.id == tag_id }.name
      end

      def tags
        @tags ||= Tag.find(
          tag_ids_count_limited.map(&:first)
        )
      end
    end
  end
end
