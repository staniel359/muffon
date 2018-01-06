module Lastfm
  module Recommendations
    class ArtistsProcessor < Service
      def call
        process_artists
      end

    private

      def process_artists
        @redis.set("#{@profile.id}:artists_current_count", 0)
        broadcast_import_start

        profile_artist_ids.each { |id| process_artist(id) }
        @redis.del("#{@profile.id}:artists_current_count")
      end

      def broadcast_import_start
        ActionCable.server.broadcast(
          "tracks_import_#{@profile.id}",
          id: @profile.id, p: 3
        )
      end

      def profile_artist_ids
        @profile.profile_artists.pluck(:id)
      end

      def process_artist(id)
        RecommendationArtistProcessorWorker.perform_async(
          id, @profile.id, 'base'
        )
      end

      def profile_artists_count
        @profile_artists_count ||= @profile.profile_artists.count
      end
    end
  end
end
