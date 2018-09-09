module Muffon
  module Processor
    class Tracks < Muffon::Processor::Base
      def call
        process_tracks
      end

    private

      def process_tracks
        return [] unless tracks_data.present?

        tracks_sorted.map { |t| update_track(t, artist.id) }
      end

      def tracks_sorted
        tracks_data.sort_by { |t| t[:lastfm_plays_count] }.reverse
      end

      def tracks_data
        @tracks_data ||= LastFM::Artist::Tracks.call(@args)
      end

      def artist
        ::Artist.with(name: @args.artist_name).first
      end
    end
  end
end
