module Muffon
  module Processor
    class Recommendation < Muffon::Processor::Base
      def call
        process_recommendation
      end

    private

      def process_recommendation
        recommendation.update(
          profile_artist_ids: profile_artist_ids
        )
      end

      def recommendation
        @recommendation ||= ::Recommendation.where(
          profile_id: @args.profile_id,
          artist_id: artist_id
        ).first_or_initialize
      end

      def artist_id
        update_artist(name: @args.artist_name).id
      end

      def profile_artist_ids
        recommendation.profile_artist_ids |=
          [@args.profile_artist_id]
      end
    end
  end
end
