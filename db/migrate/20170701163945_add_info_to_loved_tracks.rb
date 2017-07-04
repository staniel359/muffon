class AddInfoToLovedTracks < ActiveRecord::Migration[5.1]
  def change
    add_reference :loved_tracks, :profile_track, foreign_key: true
    add_reference :loved_tracks, :artist, foreign_key: true
    add_reference :loved_tracks, :profile_artist, foreign_key: true
  end
end
