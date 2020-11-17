module Muffon
  module Processor
    class Albums < Muffon::Processor::Base
      def call
        process_albums
      end

    private

      def process_albums
        return [] unless albums_data[:artist][:name].present?

        albums_sorted.map { |t| update_album(t, artist.id) }
      end

      def albums_sorted
        albums_data[:albums].sort_by do |a|
          a[:lastfm_plays_count]
        end.reverse
      end

      def albums_data
        @albums_data ||= LastFM::Artist::Albums.call(@args)
      end

      def artist
        @artist ||= ::Artist.with_name(
          albums_data[:artist][:name]
        ).first_or_create
      end
    end
  end
end
