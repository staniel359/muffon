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
        tracks_data[:tracks].sort_by do |t|
          t[:lastfm_plays_count]
        end.reverse
      end

      def tracks_data
        @tracks_data ||= LastFM::Artist::Tracks.call(@args)
      end

      def artist
        @artist ||= ::Artist.with_name(
          tracks_data[:artist][:name]
        ).first_or_create(name: tracks_data[:artist][:name])
      end
    end
  end
end
