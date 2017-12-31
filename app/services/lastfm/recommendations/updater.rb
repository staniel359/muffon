module Lastfm
  module Recommendations
    class Updater < Service
      def call
        process_artists if profile_artists_ids.present?
      end

    private

      def profile_artists_ids
        @profile.profile_artists.select do |a|
          a.recommendations.empty? == true
        end.pluck(:id)
      end

      def process_artists
        profile_artists_ids.each do |profile_artist_id|
          RecommendationArtistProcessorWorker.perform_async(
            profile_artist_id, @profile.id
          )
        end
      end
    end
  end
end
