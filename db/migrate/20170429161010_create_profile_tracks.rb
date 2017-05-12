class CreateProfileTracks < ActiveRecord::Migration[5.1]
  def change
    create_table :profile_tracks do |t|
      t.belongs_to :profile, foreign_key: true
      t.belongs_to :track, foreign_key: true
      t.belongs_to :profile_artist, foreign_key: true
      t.belongs_to :artist, foreign_key: true
      t.integer :profile_albums, array: true, default: []
      t.integer :albums, array: true, default: []
      t.integer :loved
      t.integer :count, default: 0

      t.timestamps
    end
  end
end
