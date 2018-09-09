module Muffon
  module Processor
    class SimilarArtists < Muffon::Processor::Base
      def call
        process_artists
      end

    private

      def process_artists
        return [] unless artists_data.present?

        artists_data.map do |a|
          update_artist(
            a.except(:tags).merge(tag_ids: tag_ids(a))
          )
        end
      end

      def artists_data
        LastFM::Artist::SimilarArtists.call(@args)
      end

      def tag_ids(artist)
        artist[:tags].map { |t| process_tag(t) }.pluck(:id)
      end
    end
  end
end
