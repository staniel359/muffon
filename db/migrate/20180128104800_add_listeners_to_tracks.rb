class AddListenersToTracks < ActiveRecord::Migration[5.1]
  def change
    add_column :tracks, :listeners, :integer, limit: 8
  end
end
