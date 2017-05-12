class CreateListenedArtists < ActiveRecord::Migration[5.1]
  def change
    create_table :listened_artists do |t|
      t.belongs_to :profile, foreign_key: true
      t.string :artist_name

      t.timestamps
    end
    add_index :listened_artists, [:profile_id, :artist_name], unique: true
  end
end
