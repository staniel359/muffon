module Muffon
  module Processor
    class Tag
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
          @albums_data ||= LastFM::Tag::Albums.call(@args)
        end

        def process_albums_data
          albums_data[:data].map do |a|
            update_album(
              a.except(:tags, :tracks).merge(tag_ids: tag_ids(a))
            )
          end
        end

        def tag_ids(album)
          album[:tags].map { |t| process_tag(t) }.pluck(:id)
        end
      end
    end
  end
end
