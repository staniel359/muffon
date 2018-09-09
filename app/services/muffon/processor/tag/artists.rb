module Muffon
  module Processor
    class Tag
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
          @artists_data ||= LastFM::Tag::Artists.call(@args)
        end

        def process_artists_data
          artists_data[:data].map do |a|
            update_artist(
              a.except(:tags).merge(tag_ids: tag_ids(a))
            )
          end
        end

        def tag_ids(artist)
          artist[:tags].map { |t| process_tag(t) }.pluck(:id)
        end
      end
    end
  end
end
