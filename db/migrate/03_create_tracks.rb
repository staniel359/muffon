class CreateTracks < ActiveRecord::Migration[5.2]
  def change
    create_table :tracks do |t|
      t.string :title
      t.string :mbid
      t.integer :duration
      t.string :bandcamp_link
      t.string :vk_link
      t.string :vk_id
      t.string :youtube_link

      t.belongs_to :artist, foreign_key: true

      t.integer :lastfm_listeners_count, limit: 8, default: 0
      t.integer :lastfm_plays_count,     limit: 8, default: 0
      t.integer :listeners_count,        limit: 8, default: 0
      t.integer :plays_count,            limit: 8, default: 0

      t.integer :album_ids, array: true, default: []

      t.timestamps
    end
    add_index :tracks, :title
  end
end
