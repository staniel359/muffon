module Types
  class ProfileArtistType < Types::BaseObject
    field :artist, ArtistType, null: false
    field :profile_tracks, [ProfileTrackType], null: false do
      argument :limit, Integer, required: false
    end
    field :plays, [PlayType], null: false do
      argument :limit, Integer, required: false
    end
    field :profile_albums, [ProfileAlbumType], null: false do
      argument :limit, Integer, required: false
    end
    field :tracks_count, Integer, null: false
    field :plays_count, Integer, null: false
    field :albums_count, Integer, null: false
    field :created_at, String, null: false

    def profile_tracks(limit: 50)
      object.profile_tracks.includes(
        track: :artist
      ).plays_count_desc.limit(limit)
    end

    def plays(limit: 50)
      object.plays.includes(
        :track, :artist, :album
      ).created_desc.limit(limit)
    end

    def profile_albums(limit: 50)
      object.profile_albums.includes(
        :album, :artist
      ).plays_count_desc.limit(limit)
    end
  end
end
