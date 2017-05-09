class AddTopAlbumsScopeToProfiles < ActiveRecord::Migration[5.1]
  def change
    add_column :profiles, :top_albums_scope, :integer
  end
end
