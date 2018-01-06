module Library
  module Search
    class Albums < Service
      def call
        process_albums
      end

    private

      def process_albums
        @args.q.present? ? search_albums : []
      end

      def search_albums
        @profile.profile_albums.joins(:artist, :album).select(
          '*,
          profile_albums.id as id,
          profile_albums.playcount as playcount,
          albums.id as album_id,
          artists.name as artist_name,
          albums.title as album_title'
        ).where(
          'lower(albums.title) like :q or lower(artists.name) like :q',
          q: "%#{@args.q.downcase}%"
        )
      end
    end
  end
end
