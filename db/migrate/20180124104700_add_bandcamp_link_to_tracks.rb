class AddBandcampLinkToTracks < ActiveRecord::Migration[5.1]
  def change
    add_column :tracks, :bandcamp_link, :string
  end
end
