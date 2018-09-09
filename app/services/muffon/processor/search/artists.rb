module Muffon
  module Processor
    class Search
      class Artists < Muffon::Processor::Base
        def call
          process_artists
        end

      private

        def process_artists
          return {} unless artists_data.present?

          {
            data:        process_artists_data,
            total_count: artists_data[:total_count]
          }
        end

        def artists_data
          @artists_data ||= LastFM::Search::Artists.call(@args)
        end

        def process_artists_data
          artists_data[:data].map { |a| update_artist(a) }
        end
      end
    end
  end
end
