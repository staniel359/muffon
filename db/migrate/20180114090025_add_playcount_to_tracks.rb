class AddPlaycountToTracks < ActiveRecord::Migration[5.1]
  def change
    add_column :tracks, :playcount, :integer, limit: 8
  end
end
