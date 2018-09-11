class CreateArtists < ActiveRecord::Migration[5.2]
  def change
    create_table :artists do |t|
      t.string :name
      t.string :image
      t.string :mbid
      t.text :description

      t.integer :lastfm_listeners_count, limit: 8, default: 0
      t.integer :lastfm_plays_count,     limit: 8, default: 0
      t.integer :listeners_count,        limit: 8, default: 0
      t.integer :plays_count,            limit: 8, default: 0

      t.integer :similar_artist_ids, array: true, default: []
      t.integer :tag_ids,            array: true, default: []
      t.integer :top_track_ids,      array: true, default: []
      t.integer :top_album_ids,      array: true, default: []

      t.timestamps
    end
    add_index :artists, :name
  end
end
