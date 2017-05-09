class AddArtistIdToProfileAlbums < ActiveRecord::Migration[5.1]
  def change
    add_reference :profile_albums, :artist, foreign_key: true
  end
end
