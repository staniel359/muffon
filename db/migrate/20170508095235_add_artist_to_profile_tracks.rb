class AddArtistToProfileTracks < ActiveRecord::Migration[5.1]
  def change
    add_reference :profile_tracks, :artist, foreign_key: true
  end
end
