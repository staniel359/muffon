class AddTopScopesToProfiles < ActiveRecord::Migration[5.1]
  def change
    add_column :profiles, :top_artists_scope, :integer, default: 0
    add_column :profiles, :top_albums_scope, :integer, default: 0
    add_column :profiles, :top_tracks_scope, :integer, default: 0
  end
end
