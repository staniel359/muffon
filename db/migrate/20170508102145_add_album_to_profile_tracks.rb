class AddAlbumToProfileTracks < ActiveRecord::Migration[5.1]
  def change
    add_reference :profile_tracks, :album, foreign_key: true
  end
end
