class AddBandcampLinkToAlbums < ActiveRecord::Migration[5.1]
  def change
    add_column :albums, :bandcamp_link, :string
  end
end
