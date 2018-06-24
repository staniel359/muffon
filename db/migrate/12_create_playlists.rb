class CreatePlaylists < ActiveRecord::Migration[5.1]
  def change
    create_table :playlists do |t|
      t.string :name

      t.belongs_to :profile, foreign_key: true

      t.integer :tracks_count, limit: 8, default: 0

      t.timestamps
    end
    add_index :playlists, [:profile_id, :name], unique: true
  end
end
