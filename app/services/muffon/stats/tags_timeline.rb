module Muffon
  module Stats
    class TagsTimeline < Muffon::Stats::Base
      def call
        super
      end

    private

      def retrieve_data
        return unless can_proceed?

        tag_groupped_dates.map do |k, v|
          format_tag_groupped_dates(k, v)
        end
      end

      def can_proceed?
        @profile.plays.present? && top_tags.present?
      end

      def top_tags
        @top_tags ||= Tag.where(name: tags_data.map(&:first))
      end

      def tags_data
        Muffon::Stats::Tags.call(@args)
      end

      def tag_groupped_dates
        tags_with_play_dates.group_by { |a| a[0] }
      end

      def tags_with_play_dates
        plays.map { |p| add_play_date_to_tag(p) }.inject(:+)
      end

      def plays
        scope.nil? ? all_plays : scoped_plays
      end

      def all_plays
        @profile.plays.joins(:artist).where(
          'artists.tag_ids && array[?]', tag_ids
        ).includes(:artist)
      end

      def tag_ids
        @tag_ids ||= top_tags.pluck(:id)
      end

      def scoped_plays
        all_plays.where(
          'plays.created_at between ? and ?',
          start_date, end_date
        )
      end

      def add_play_date_to_tag(play)
        (play.artist.tag_ids & tag_ids).map do |t|
          [t, play.created_at]
        end
      end

      def format_tag_groupped_dates(tag_id, dates)
        {
          name: tag_name_by_id(tag_id),
          data: dates_grouped_counted(dates)
        }
      end

      def tag_name_by_id(tag_id)
        top_tags.find { |t| t.id == tag_id }.name
      end

      def dates_grouped_counted(dates)
        dates.send(
          grouping_method, &:second
        ).transform_values(&:length)
      end

      def grouping_method
        "group_by_#{scope_groupings[scope] || 'month'}"
      end
    end
  end
end
