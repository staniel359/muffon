module Types
  class ProfileTrackType < Types::BaseObject
    field :track, TrackType, null: false
    field :profile_artist, ProfileArtistType, null: false
    field :plays_count, Integer, null: false
    field :created_at, String, null: false
    field :loved, Boolean, null: false
    field :loved_at, String, null: true
  end
end
