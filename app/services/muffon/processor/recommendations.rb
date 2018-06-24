module Muffon
  module Processor
    class Recommendations < Muffon::Base
      def call
        process_artist_recommendations
      end

    private

      def process_artist_recommendations
        recommendations.each { |a| process_artist(a) }
      end

      def recommendations
        LastFM::Artist::Recommendations.call(
          artist_name: profile_artist.artist.name
        )
      end

      def profile_artist
        ::ProfileArtist.find_by(id: @args.profile_artist_id)
      end

      def process_artist(artist)
        Muffon::Processor::Recommendation.call(
          profile_id:        @args.profile_id,
          profile_artist_id: @args.profile_artist_id,
          artist:            artist
        )
      end
    end
  end
end
