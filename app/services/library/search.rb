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

      @profile.profile_artists.includes(:artist).joins(
        'JOIN "artists" ON "artists"."id" = "profile_artists"."artist_id"'
      ).where(
        'LOWER(artists.name) LIKE ?', "%#{@args.q.downcase}%"
      ).limit(4)
    end

    def search_albums
      return [] if @args.only.present? && @args.only != 'albums'

      @profile.profile_albums.includes(:artist, [album: :artist]).joins(
        'JOIN "albums" ON "albums"."id" = "profile_albums"."album_id"'
      ).joins(
        'JOIN "artists" ON "artists"."id" = "profile_albums"."artist_id"'
      ).where(
        'LOWER(albums.title) LIKE ?', "%#{@args.q.downcase}%"
      ).limit(4)
    end

    def search_tracks
      return [] if @args.only.present? && @args.only != 'tracks'

      @profile.profile_tracks.includes(:artist, [track: :artist]).joins(
        'JOIN "tracks" ON "tracks"."id" = "profile_tracks"."track_id"'
      ).joins(
        'JOIN "artists" ON "artists"."id" = "profile_tracks"."artist_id"'
      ).where(
        'LOWER(tracks.title) LIKE ?', "%#{@args.q.downcase}%"
      ).limit(5)
    end
  end
end
