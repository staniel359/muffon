module Muffon
  module Processor
    class Search
      class Albums < Muffon::Processor::Base
        def call
          process_albums
        end

      private

        def process_albums
          return {} unless albums_data.present?

          {
            data: process_albums_data,
            total_count: albums_data[:total_count]
          }
        end

        def albums_data
          @albums_data ||= LastFM::Search::Albums.call(@args)
        end

        def process_albums_data
          albums_data[:data].map { |a| update_album(a) }
        end
      end
    end
  end
end
