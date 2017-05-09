class AddLibraryArtistsScopeToProfiles < ActiveRecord::Migration[5.1]
  def change
    add_column :profiles, :library_artists_scope, :string
  end
end
