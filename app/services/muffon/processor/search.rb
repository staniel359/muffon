module Muffon
  module Processor
    class Search < Muffon::Processor::Base
      def call
        process_search_data
      end

    private

      def process_search_data
        return empty_hash unless search_data.present?

        search_data_hash
      end

      def search_data
        @search_data ||= LastFM::Search.call(@args)
      end

      def empty_hash
        {
          q: @args.q,
          artists: [],
          albums: [],
          tracks: []
        }
      end

      def search_data_hash
        search_data.tap do |s|
          s[:q] = @args.q
          s[:artists] = s[:artists].map { |a| update_artist(a) }
          s[:albums]  = s[:albums].map { |a| update_album(a) }
          s[:tracks]  = s[:tracks].map { |t| update_track(t) }
        end
      end
    end
  end
end
