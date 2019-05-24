module Muffon
  module Processor
    class Recommendations < Muffon::Processor::Base
      def call
        process_artist_recommendations
      end

    private

      def process_artist_recommendations
        recommendations.each { |a| process_artist(a) }
      end

      def recommendations
        LastFM::Artist::SimilarArtists.call(
          artist_name: profile_artist.artist.name,
          limit: 50
        )
      end

      def profile_artist
        ::ProfileArtist.find_by(id: @args.profile_artist_id)
      end

      def process_artist(artist)
        Muffon::Processor::Recommendation.call(
          profile_id: @args.profile_id,
          profile_artist_id: @args.profile_artist_id,
          artist: artist
        )
      end
    end
  end
end
