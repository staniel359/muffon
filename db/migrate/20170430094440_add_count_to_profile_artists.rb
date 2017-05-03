class AddCountToProfileArtists < ActiveRecord::Migration[5.1]
  def change
    add_column :profile_artists, :count, :integer, default: 0
  end
end
