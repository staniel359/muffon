module Muffon
  module Processor
    class Recommendation < Muffon::Base
      def call
        process_recommendation
      end

    private

      def process_recommendation
        recommendation.update(profile_artist_ids: profile_artist_ids)
        ArtistUpdateWorker.perform_async(artist.name)
      end

      def recommendation
        @recommendation ||= ::Recommendation.where(
          profile_id: @args.profile_id,
          artist_id:  artist.id
        ).first_or_initialize
      end

      def artist
        @artist ||= Muffon::Processor::Artist.call(artist: @args.artist)
      end

      def profile_artist_ids
        recommendation.profile_artist_ids |= [@args.profile_artist_id]
      end
    end
  end
end
