module Muffon
  module Stats
    class Base < Muffon::Base
      ARTISTS_LIMIT = 20
      TRACKS_LIMIT = 20

      def call
        return if incomplete_date?

        retrieve_data
      rescue ArgumentError # if invalid date
        []
      end

    private

      def scope
        return unless @args.scope.present?
        return :day if @args.scope[:day].present?
        return :month if @args.scope[:month].present?
        return :year if @args.scope[:year].present?
      end

      def start_date
        values_to_time.send("beginning_of_#{scope}")
      end

      def values_to_time
        Time.new(*@args.scope.values.reject(&:empty?))
      end

      def end_date
        values_to_time.send("end_of_#{scope}")
      end

      def scope_groupings
        {
          day: 'hour',
          month: 'day',
          year: 'month'
        }
      end

      def incomplete_date?
        @args.scope.present? && (no_year? || no_month?)
      end

      def no_year?
        @args.scope.yield_self do |s|
          s[:year].empty? &&
            [s[:month], s[:day]].any?(&:present?)
        end
      end

      def no_month?
        @args.scope.yield_self do |s|
          s[:month].empty? &&
            [s[:year], s[:day]].all?(&:present?)
        end
      end
    end
  end
end
