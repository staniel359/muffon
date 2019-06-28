module Types
  class TagType < Types::BaseObject
    field :name, String, null: false
    field :artists, [ArtistType], null: true do
      argument :limit, Integer, required: false
    end
    field :albums, [AlbumType], null: true do
      argument :limit, Integer, required: false
    end
    field :tracks, [TrackType], null: true do
      argument :limit, Integer, required: false
    end

    def artists(limit: nil)
      Muffon::Processor::Tag::Artists.call(
        tag_name: object.name, limit: limit
      )
    end

    def albums(limit: nil)
      Muffon::Processor::Tag::Albums.call(
        tag_name: object.name, limit: limit
      )
    end

    def tracks(limit: nil)
      Muffon::Processor::Tag::Tracks.call(
        tag_name: object.name, limit: limit
      )
    end
  end
end
