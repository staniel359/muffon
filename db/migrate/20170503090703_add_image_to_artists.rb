class AddImageToArtists < ActiveRecord::Migration[5.1]
  def change
    add_column :artists, :image, :string
  end
end
