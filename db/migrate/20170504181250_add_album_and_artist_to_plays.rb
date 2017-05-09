class AddAlbumAndArtistToPlays < ActiveRecord::Migration[5.1]
  def change
    add_reference :plays, :profile_album, foreign_key: true
    add_reference :plays, :artist, foreign_key: true
    add_reference :plays, :profile_artist, foreign_key: true
  end
end
