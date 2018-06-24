class CreateProfileAlbums < ActiveRecord::Migration[5.1]
  def change
    create_table :profile_albums do |t|
      t.belongs_to :profile,        foreign_key: true
      t.belongs_to :album,          foreign_key: true
      t.belongs_to :profile_artist, foreign_key: true

      t.integer :profile_track_ids, array: true, default: []

      t.integer :plays_count, limit: 8, default: 0

      t.timestamps
    end
  end
end
