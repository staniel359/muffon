class AddCountToProfileTracks < ActiveRecord::Migration[5.1]
  def change
    add_column :profile_tracks, :count, :integer, default: 0
  end
end
