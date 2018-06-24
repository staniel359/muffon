class CreateListenedArtists < ActiveRecord::Migration[5.1]
  def change
    create_table :listened_artists do |t|
      t.belongs_to :profile, foreign_key: true
      t.belongs_to :artist,  foreign_key: true

      t.timestamps
    end
    add_index :listened_artists, [:profile_id, :artist_id], unique: true
  end
end
