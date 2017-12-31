class CreatePlaylists < ActiveRecord::Migration[5.1]
  def change
    create_table :playlists do |t|
      t.belongs_to :profile, foreign_key: true
      t.string :name

      t.timestamps
    end
    add_index :playlists, [:profile_id, :name], unique: true
  end
end
