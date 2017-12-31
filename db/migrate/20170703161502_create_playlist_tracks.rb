class CreatePlaylistTracks < ActiveRecord::Migration[5.1]
  def change
    create_table :playlist_tracks do |t|
      t.belongs_to :playlist, foreign_key: true
      t.belongs_to :profile_track, foreign_key: true
      t.belongs_to :track, foreign_key: true
      t.belongs_to :profile_artist, foreign_key: true
      t.belongs_to :artist, foreign_key: true
      t.belongs_to :profile_album, foreign_key: true
      t.belongs_to :album, foreign_key: true

      t.timestamps
    end
    add_index :playlist_tracks, [:playlist_id, :profile_track_id], unique: true
  end
end
