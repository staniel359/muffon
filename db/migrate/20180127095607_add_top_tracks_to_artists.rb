class AddTopTracksToArtists < ActiveRecord::Migration[5.1]
  def change
    add_column :artists, :top_tracks, :integer, array: true, default: []
  end
end
