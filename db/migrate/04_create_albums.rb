class CreateAlbums < ActiveRecord::Migration[5.1]
  def change
    create_table :albums do |t|
      t.string :title
      t.belongs_to :artist, foreign_key: true
      t.string :cover
      t.string :mbid
      t.text :description
      t.string :release_date
      t.string :format
      t.string :bandcamp_link

      t.integer :lastfm_listeners_count, limit: 8, default: 0
      t.integer :listeners_count,        limit: 8, default: 0
      t.integer :lastfm_plays_count,     limit: 8, default: 0
      t.integer :plays_count,            limit: 8, default: 0

      t.integer :label_ids, array: true, default: []
      t.integer :tag_ids,   array: true, default: []
      t.integer :track_ids, array: true, default: []

      t.boolean :official, default: false

      t.timestamps
    end
    add_index :albums, :title
    add_index :albums, [:title, :artist_id], unique: true
  end
end
