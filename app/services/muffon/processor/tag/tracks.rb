module Muffon
  module Processor
    class Tag
      class Tracks < Muffon::Processor::Base
        def call
          process_tracks
        end

      private

        def process_tracks
          tracks_data[:tracks].map { |t| update_track(t) }
        end

        def tracks_data
          LastFM::Tag::Tracks.call(@args)
        end
      end
    end
  end
end
