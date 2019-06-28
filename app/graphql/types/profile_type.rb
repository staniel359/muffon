module Types
  class ProfileType < Types::BaseObject
    field :nickname, String, null: false
    field :name, String, null: true
    field :country, String, null: true
    field :city, String, null: true
    field :birthdate, String, null: true
    field :gender, String, null: true
    field :plays_count, Integer, null: true
    field :artists_count, Integer, null: true
    field :albums_count, Integer, null: true
    field :tracks_count, Integer, null: true
    field :loved_tracks_count, Integer, null: true
    field :tags_count, Integer, null: true
    field :plays, [PlayType], null: true do
      argument :limit, Integer, required: false
      argument :page, Integer, required: false
    end
    field :profile_tracks, [ProfileTrackType], null: true do
      argument :limit, Integer, required: false
      argument :page, Integer, required: false
    end
    field :profile_artists, [ProfileArtistType], null: true do
      argument :limit, Integer, required: false
      argument :page, Integer, required: false
    end
    field :profile_albums, [ProfileAlbumType], null: true do
      argument :limit, Integer, required: false
      argument :page, Integer, required: false
    end
    field :loved_tracks, [ProfileTrackType], null: true do
      argument :limit, Integer, required: false
      argument :page, Integer, required: false
    end

    def plays(limit: 50, page: 1)
      object.plays.includes(
        :track, :artist, :album
      ).created_desc.limit(limit).offset(limit * (page - 1))
    end

    def profile_tracks(limit: 50, page: 1)
      object.profile_tracks.includes(
        track: :artist
      ).plays_count_desc.limit(limit).offset(limit * (page - 1))
    end

    def profile_artists(limit: 50, page: 1)
      object.profile_artists.includes(
        :artist
      ).plays_count_desc.limit(limit).offset(limit * (page - 1))
    end

    def profile_albums(limit: 50, page: 1)
      object.profile_albums.includes(
        album: :artist
      ).plays_count_desc.limit(limit).offset(limit * (page - 1))
    end

    def loved_tracks(limit: 50, page: 1)
      object.profile_tracks.loved.loved_desc.associated
            .limit(limit).offset(limit * (page - 1))
    end
  end
end
