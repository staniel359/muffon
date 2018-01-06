class AddTopAlbumsToArtists < ActiveRecord::Migration[5.1]
  def change
    add_column :artists, :top_albums, :integer, array: true, default: []
  end
end
