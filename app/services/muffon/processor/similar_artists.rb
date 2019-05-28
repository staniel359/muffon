module Muffon
  module Processor
    class SimilarArtists < Muffon::Processor::Base
      def call
        process_artists
      end

    private

      def process_artists
        return [] unless
            [@args.artist_name, artists_data].all?(&:present?)

        artists_data.map do |a|
          update_artist(
            a.except(:tags).merge(tag_ids: tag_ids(a))
          )
        end
      end

      def artists_data
        @artists_data ||=
          LastFM::Artist::SimilarArtists.call(@args)[:artists]
      end

      def tag_ids(artist)
        artist[:tags].map { |t| process_tag(t) }.pluck(:id)
      end
    end
  end
end
