class AddWikiToTracks < ActiveRecord::Migration[5.2]
  def change
    add_column :tracks, :wiki, :text
  end
end
