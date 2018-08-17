module Library
  class Search < Muffon::Base
    def call
      search_in_library
    end

  private

    def search_in_library
      {
        artists: search_artists,
        albums:  search_albums,
        tracks:  search_tracks
      }
    end

    def search_artists
      return [] if @args.only.present? && @args.only != 'artists'

      @profile.profile_artists.joins(
        'JOIN "artists" ON "artists"."id" = "profile_artists"."artist_id"'
      ).where(
        'LOWER(artists.name) LIKE ?', "%#{@args.q.downcase}%"
      ).limit(8)
    end

    def search_albums
      return [] if @args.only.present? && @args.only != 'albums'

      @profile.profile_albums.joins(
        'JOIN "albums" ON "albums"."id" = "profile_albums"."album_id"'
      ).joins(
        'JOIN "artists" ON "artists"."id" = "profile_albums"."artist_id"'
      ).where(
        'LOWER(albums.title) LIKE :q OR LOWER(artists.name) LIKE :q',
        q: "%#{@args.q.downcase}%"
      ).limit(8)
    end

    def search_tracks
      return [] if @args.only.present? && @args.only != 'tracks'

      @profile.profile_tracks.joins(
        'JOIN "tracks" ON "tracks"."id" = "profile_tracks"."track_id"'
      ).joins(
        'JOIN "artists" ON "artists"."id" = "profile_tracks"."artist_id"'
      ).where(
        'LOWER(tracks.title) LIKE :q OR LOWER(artists.name) LIKE :q',
        q: "%#{@args.q.downcase}%"
      ).limit(10)
    end
  end
end
