module Muffon
  module Processor
    class Tag
      class Tracks < Muffon::Processor::Base
        def call
          process_tracks
        end

      private

        def process_tracks
          return {} unless tracks_data.present?

          {
            data:        process_tracks_data,
            total_count: tracks_data[:total_count]
          }
        end

        def tracks_data
          @tracks_data ||= LastFM::Tag::Tracks.call(@args)
        end

        def process_tracks_data
          tracks_data[:data].map { |t| update_track(t) }
        end
      end
    end
  end
end
