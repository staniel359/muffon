module Types
  class ArtistType < Types::BaseObject
    field :name, String, null: false
    field :image, String, null: true
    field :description, String, null: true
    field :tracks, [TrackType], null: true do
      argument :limit, Integer, required: false
      argument :page, Integer, required: false
    end
    field :albums, [AlbumType], null: true do
      argument :limit, Integer, required: false
      argument :page, Integer, required: false
    end
    field :similar_artists, [ArtistType], null: true do
      argument :limit, Integer, required: false
      argument :page, Integer, required: false
    end
    field :tags, [TagType], null: true do
      argument :limit, Integer, required: false
    end
    field :lastfm_listeners_count, Integer, null: true
    field :lastfm_plays_count, Integer, null: true
    field :listeners_count, Integer, null: true
    field :plays_count, Integer, null: true

    def tracks(limit: nil, page: nil)
      API::Artist::Tracks.call(
        artist_name: object.name,
        limit: limit, page: page
      )
    end

    def albums(limit: nil, page: nil)
      API::Artist::Albums.call(
        artist_name: object.name,
        limit: limit, page: page
      )
    end

    def similar_artists(limit: nil, page: nil)
      API::Artist::SimilarArtists.call(
        artist_name: object.name,
        limit: limit, page: page
      )
    end

    def tags(limit: nil)
      API::Artist::Tags.call(
        artist_name: object.name,
        limit: limit
      )
    end
  end
end
