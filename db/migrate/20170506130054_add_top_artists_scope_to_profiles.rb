class AddTopArtistsScopeToProfiles < ActiveRecord::Migration[5.1]
  def change
    add_column :profiles, :top_artists_scope, :integer
  end
end
