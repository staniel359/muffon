module Library
  module Search
    class Tracks < Service
      def call
        process_tracks
      end

    private

      def process_tracks
        @args.q.present? ? search_tracks : []
      end

      def search_tracks
        @profile.profile_tracks.joins(:track, :artist).select(
          '*,
          profile_tracks.id as id,
          tracks.title as title,
          artists.name as artist_name'
        ).where(
          'lower(tracks.title) like :q or lower(artists.name) like :q',
          q: "%#{@args.q.downcase}%"
        )
      end
    end
  end
end
