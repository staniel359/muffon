class CreateAlbums < ActiveRecord::Migration[5.1]
  def change
    create_table :albums do |t|
      t.string :title
      t.belongs_to :artist, foreign_key: true
      t.string :cover
      t.string :mbid
      t.integer :tags, array: true, default: []
      t.integer :tracks, array: true, default: []
      t.integer :listeners, limit: 8
      t.integer :playcount, limit: 8
      t.text :description
      t.string :labels, array: true, default: []
      t.string :released_at
      t.integer :discogs_main_id
      t.integer :discogs_ids, array: true, default: []
      t.string :format
      t.boolean :full, default: false
      t.string :role

      t.timestamps
    end
    add_index :albums, :title
  end
end
