class ChangeIndexForPlaylistTracks < ActiveRecord::Migration[5.1]
  def change
    remove_index :playlist_tracks, [:playlist_id, :profile_track_id]
    add_index :playlist_tracks, [:playlist_id, :track_id], unique: true
  end
end
