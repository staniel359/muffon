class AddArtistToProfileAlbums < ActiveRecord::Migration[5.1]
  def change
    add_reference :profile_albums, :profile_artist, foreign_key: true
  end
end
