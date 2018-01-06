module Library
  module Search
    class Artists < Service
      def call
        process_artists
      end

    private

      def process_artists
        @args.q.present? ? search_artists : []
      end

      def search_artists
        @profile.profile_artists.joins(:artist).select(
          '*,
          profile_artists.id as id,
          profile_artists.playcount as playcount,
          artists.name as artist_name'
        ).where(
          'lower(artists.name) like :q',
          q: "%#{@args.q.downcase}%"
        )
      end
    end
  end
end
