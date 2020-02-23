module Muffon
  module Processor
    class Recommendations < Muffon::Processor::Base
      def call
        process_artist_recommendations
      rescue RestClient::BadGateway, RestClient::InternalServerError
        retry
      end

    private

      def process_artist_recommendations
        return unless profile_artist.present?

        recommendations.each { |a| process_artist(a) }
      end

      def profile_artist
        @profile_artist ||= ::ProfileArtist.find_by(
          id: @args.profile_artist_id
        )
      end

      def recommendations
        LastFM::Artist::SimilarArtists.call(
          artist_name: profile_artist.artist.name,
          limit: 50
        )[:artists]
      end

      def process_artist(artist)
        Muffon::Processor::Recommendation.call(
          profile_id: profile_artist.profile_id,
          profile_artist_id: profile_artist.id,
          artist: artist
        )
      end
    end
  end
end
