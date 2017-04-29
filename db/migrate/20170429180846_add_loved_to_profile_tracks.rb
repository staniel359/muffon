class AddLovedToProfileTracks < ActiveRecord::Migration[5.1]
  def change
    add_column :profile_tracks, :loved, :integer
  end
end
