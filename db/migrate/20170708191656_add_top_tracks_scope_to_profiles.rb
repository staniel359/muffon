class AddTopTracksScopeToProfiles < ActiveRecord::Migration[5.1]
  def change
    add_column :profiles, :top_tracks_scope, :integer
  end
end
