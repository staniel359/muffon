module Muffon
  module Processor
    class Search < Muffon::Processor::Base
      def call
        process_search_data
      end

    private

      def process_search_data
        return empty_hash unless search_data.present?

        search_data.tap do |s|
          s[:artists] = s[:artists].map { |a| update_artist(a) }
          s[:albums]  = s[:albums].map { |a| update_album(a) }
          s[:tracks]  = s[:tracks].map { |t| update_track(t) }
        end
      end

      def search_data
        @search_data ||= LastFM::Search.call(@args)
      end

      def empty_hash
        { artists: [], albums: [], tracks: [] }
      end
    end
  end
end
