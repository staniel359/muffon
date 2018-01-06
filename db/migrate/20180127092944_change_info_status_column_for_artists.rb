class ChangeInfoStatusColumnForArtists < ActiveRecord::Migration[5.1]
  def change
    remove_column :artists, :info_status
    add_column :artists, :full, :boolean, default: false
  end
end
