class CreatePlaylistTracks < ActiveRecord::Migration[5.1]
  def change
    create_table :playlist_tracks do |t|
      t.belongs_to :playlist, foreign_key: true
      t.belongs_to :profile_track, foreign_key: true

      t.timestamps
    end
  end
end
