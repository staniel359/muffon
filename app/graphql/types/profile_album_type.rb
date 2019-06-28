module Types
  class ProfileAlbumType < Types::BaseObject
    field :album, AlbumType, null: false
    field :profile_artist, ProfileArtistType, null: false
    field :artist, ArtistType, null: false
    field :profile_tracks, [ProfileTrackType], null: false do
      argument :limit, Integer, required: false
    end
    field :plays_count, Integer, null: false
    field :created_at, String, null: false

    def profile_tracks(limit: 10)
      ProfileTrack.where(
        id: object.profile_track_ids
      ).includes(:track).plays_count_desc.limit(limit)
    end
  end
end
