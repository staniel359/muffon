class CreateArtists < ActiveRecord::Migration[5.1]
  def change
    create_table :artists do |t|
      t.string :name
      t.string :image
      t.string :mbid
      t.integer :listeners, limit: 8
      t.integer :discogs_ids, limit: 8, array: true, default: []
      t.integer :playcount, limit: 8
      t.text :description
      t.integer :similars, limit: 8, array: true, default: []
      t.integer :tags, array: true, default: []
      t.integer :top_track_count, limit: 8
      t.jsonb :official_releases, default: []
      t.string :info_status, default: 'none'

      t.timestamps
    end
    add_index :artists, :name
  end
end
