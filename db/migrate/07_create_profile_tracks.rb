class CreateProfileTracks < ActiveRecord::Migration[5.2]
  def change
    create_table :profile_tracks do |t|
      t.belongs_to :profile,        foreign_key: true
      t.belongs_to :track,          foreign_key: true
      t.belongs_to :profile_artist, foreign_key: true
      t.belongs_to :artist,         foreign_key: true

      t.integer :profile_album_ids, array: true, default: []

      t.integer :plays_count, default: 0

      t.boolean :loved, default: false

      t.datetime :loved_at
      t.timestamps
    end
  end
end
