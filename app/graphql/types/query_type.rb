module Types
  class QueryType < Types::BaseObject
    field :artist, ArtistType, null: true do
      argument :name, String, required: true
    end

    field :album, AlbumType, null: true do
      argument :title, String, required: true
      argument :artist_name, String, required: true
    end

    field :track, TrackType, null: true do
      argument :title, String, required: true
      argument :artist_name, String, required: true
    end

    field :tag, TagType, null: true do
      argument :name, String, required: true
    end

    field :profile, ProfileType, null: true do
      argument :nickname, String, required: true
    end

    field :search, SearchType, null: true do
      argument :query, String, required: true
    end

    def artist(name:)
      API::Artist.call(artist_name: name)
    end

    def album(title:, artist_name:)
      API::Album.call(
        artist_name: artist_name,
        album_title: title
      )
    end

    def track(title:, artist_name:)
      Muffon::Processor::Track.call(
        artist_name: artist_name,
        track_title: title
      )
    end

    def tag(name:)
      Tag.with(name: name).first_or_create(
        name: name.downcase
      )
    end

    def profile(nickname:)
      Profile.where(
        'lower(nickname) = ?', nickname.downcase
      ).first
    end

    def search(query:)
      { search: { query: query } }
    end
  end
end
