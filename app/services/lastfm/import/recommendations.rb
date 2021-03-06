module LastFM
  module Import
    class Recommendations < LastFM::Import::Base
      def call
        process_recommendations
      end

    private

      def process_recommendations
        reset_counter('recommendations')
        set_total_count('recommendations', total_count)
        broadcast_import_start('recommendations')
        import_recommendations
        delete_counter('recommendations')
        @profile.update(lastfm_import_completed: true)
      end

      def total_count
        profile_artist_ids.length
      end

      def profile_artist_ids
        @profile_artist_ids ||= ProfileArtist.where(
          id: @profile.profile_artist_ids
        ).order(plays_count: :desc).pluck(:id) -
          Recommendation.pluck(:profile_artist_ids).flatten.uniq
      end

      def import_recommendations
        profile_artist_ids.each do |id|
          process_artist(id)
          broadcast_current_count('recommendations')
        end
      end

      def process_artist(id)
        Muffon::Processor::Recommendations.call(
          profile_id: @profile.id,
          profile_artist_id: id
        )
      rescue NETWORK_ERRORS
        retry
      end
    end
  end
end
