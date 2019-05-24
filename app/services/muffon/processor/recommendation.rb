module Muffon
  module Processor
    class Recommendation < Muffon::Processor::Base
      def call
        process_recommendation
      end

    private

      def process_recommendation
        recommendation.update(profile_artist_ids: profile_artist_ids)
      end

      def recommendation
        @recommendation ||= ::Recommendation.where(
          profile_id: @args.profile_id,
          artist_id: artist.id
        ).first_or_initialize
      end

      def artist
        update_artist(
          @args.artist.except(:tags).merge(tag_ids: tag_ids)
        )
      end

      def tag_ids
        @args.artist[:tags].map { |t| process_tag(t) }.pluck(:id)
      end

      def profile_artist_ids
        recommendation.profile_artist_ids |= [@args.profile_artist_id]
      end
    end
  end
end
