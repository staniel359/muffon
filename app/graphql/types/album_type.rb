module Types
  class AlbumType < Types::BaseObject
    field :title, String, null: false
    field :artist, ArtistType, null: false
    field :cover, String, null: true
    field :description, String, null: true
    field :release_date, String, null: true
    field :bandcamp_link, String, null: true
    field :lastfm_listeners_count, Integer, null: true
    field :lastfm_plays_count, Integer, null: true
    field :listeners_count, Integer, null: true
    field :plays_count, Integer, null: true
    field :labels, [LabelType], null: true
    field :tags, [TagType], null: true do
      argument :limit, Integer, required: false
    end
    field :tracks, [TrackType], null: true

    def labels
      Label.find(object.label_ids)
    end

    def tags(limit: nil)
      API::Album::Tags.call(
        artist_name: object.artist.name,
        album_title: object.title,
        limit: limit
      )
    end

    def tracks
      API::Album::Tracks.call(
        artist_name: object.artist.name,
        album_title: object.title
      )
    end
  end
end
