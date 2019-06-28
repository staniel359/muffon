module API
  class Artist
    class SimilarArtists < Muffon::Processor::Base
      def call
        retrieve_similar_artists
      end

    private

      def retrieve_similar_artists
        similar_artists_data.map do |t|
          update_artist(t.except(:tags))
        end
      end

      def similar_artists_data
        LastFM::Artist::SimilarArtists.call(@args)[:artists]
      end
    end
  end
end
