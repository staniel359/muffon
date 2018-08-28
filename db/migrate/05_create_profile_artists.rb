class CreateProfileArtists < ActiveRecord::Migration[5.2]
  def change
    create_table :profile_artists do |t|
      t.belongs_to :profile, foreign_key: true
      t.belongs_to :artist,  foreign_key: true

      t.integer :tracks_count, limit: 8, default: 0
      t.integer :plays_count,  limit: 8, default: 0
      t.integer :albums_count,  limit: 8, default: 0

      t.timestamps
    end
  end
end
