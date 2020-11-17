module Muffon
  module Processor
    class Recommendations
      class Artists < Muffon::Processor::Base
        def call
          process_artists
        end

      private

        def process_artists
          return unless artists_data.present?

          artists_data[:artists].map { |a| process_artist(a) }
        end

        def artists_data
          @artists_data ||= LastFM::Artists.call(@args)
        end

        def process_artist(artist)
          update_artist(
            artist.except(:tags).merge(tag_ids: tag_ids(artist))
          )
        end

        def tag_ids(artist)
          artist[:tags].map { |t| process_tag(t) }.pluck(:id)
        end
      end
    end
  end
end
