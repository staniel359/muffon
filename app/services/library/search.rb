module Library
  class Search < Muffon::Base
    def call
      search_in_library
    end

  private

    def search_in_library
      {
        tracks:  search_tracks,
        artists: search_artists,
        albums:  search_albums
      }
    end

    def search_tracks
      return [] if @args.only.present? && @args.only != 'tracks'

      @profile.profile_tracks.joins(
        :track, profile_artist: :artist
      ).where(
        'LOWER(tracks.title) LIKE :q OR LOWER(artists.name) LIKE :q',
        q: "%#{@args.q.downcase}%"
      ).includes(:track, profile_artist: :artist)
    end

    def search_artists
      return [] if @args.only.present? && @args.only != 'artists'

      @profile.profile_artists.joins(:artist).where(
        'LOWER(artists.name) LIKE ?', "%#{@args.q.downcase}%"
      ).includes(:artist)
    end

    def search_albums
      return [] if @args.only.present? && @args.only != 'albums'

      @profile.profile_albums.joins(
        :album, profile_artist: :artist
      ).where(
        'LOWER(albums.title) LIKE :q OR LOWER(artists.name) LIKE :q',
        q: "%#{@args.q.downcase}%"
      ).includes(:album, profile_artist: :artist)
    end
  end
end
