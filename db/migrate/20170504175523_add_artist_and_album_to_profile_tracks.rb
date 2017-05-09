class AddArtistAndAlbumToProfileTracks < ActiveRecord::Migration[5.1]
  def change
    add_reference :profile_tracks, :profile_artist, foreign_key: true
    add_reference :profile_tracks, :profile_album, foreign_key: true
  end
end
