module Muffon
  module Processor
    class Albums < Muffon::Processor::Base
      def call
        process_albums
      end

    private

      def process_albums
        return [] unless albums_data.present?

        albums_sorted.map { |t| update_album(t, artist.id) }
      end

      def albums_sorted
        albums_data.sort_by { |a| a[:lastfm_plays_count] }.reverse
      end

      def albums_data
        @albums_data ||= LastFM::Artist::Albums.call(@args)
      end

      def artist
        ::Artist.with(name: @args.artist_name).first
      end
    end
  end
end
