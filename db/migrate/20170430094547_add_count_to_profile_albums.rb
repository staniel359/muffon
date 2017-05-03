class AddCountToProfileAlbums < ActiveRecord::Migration[5.1]
  def change
    add_column :profile_albums, :count, :integer, default: 0
  end
end
