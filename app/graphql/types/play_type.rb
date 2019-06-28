module Types
  class PlayType < Types::BaseObject
    field :track, TrackType, null: false
    field :artist, ArtistType, null: false
    field :album, AlbumType, null: true
    field :created_at, String, null: false
  end
end
