module Types
  class TrackType < Types::BaseObject
    field :title, String, null: false
    field :artist, ArtistType, null: false
    field :duration, Integer, null: true
    field :bandcamp_link, String, null: true
    field :vk_link, String, null: true
    field :youtube_link, String, null: true
    field :lastfm_listeners_count, Integer, null: true
    field :lastfm_plays_count, Integer, null: true
    field :listeners_count, Integer, null: true
    field :plays_count, Integer, null: true
    field :albums, [AlbumType], null: true
    field :tags, [TagType], null: true
    field :wiki, String, null: true

    def albums
      Album.find(object.album_ids)
    end

    def tags
      Tag.find(object.tag_ids)
    end

    def vk_link
      VK::Track.call(vk_id: object.vk_id)
    end
  end
end
