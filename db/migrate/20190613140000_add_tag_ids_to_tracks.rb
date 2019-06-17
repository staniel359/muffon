class AddTagIdsToTracks < ActiveRecord::Migration[5.2]
  def change
    add_column :tracks, :tag_ids, :integer, array: true, default: []
  end
end
