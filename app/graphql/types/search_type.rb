module Types
  class SearchType < Types::BaseObject
    field :query, String, null: false
    field :artists, [ArtistType], null: true do
      argument :limit, Integer, required: false
    end
    field :albums, [AlbumType], null: true do
      argument :limit, Integer, required: false
    end
    field :tracks, [TrackType], null: true do
      argument :limit, Integer, required: false
    end

    def query
      object.dig(:search, :query)
    end

    def artists(limit: 10)
      Muffon::Processor::Search::Model.call(
        q: query, model: 'artist', limit: limit
      )
    end

    def albums(limit: 10)
      Muffon::Processor::Search::Model.call(
        q: query, model: 'album', limit: limit
      )
    end

    def tracks(limit: 10)
      Muffon::Processor::Search::Model.call(
        q: query, model: 'track', limit: limit
      )
    end
  end
end
