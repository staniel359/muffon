class AddLastfmIdToProfiles < ActiveRecord::Migration[5.1]
  def change
    add_column :profiles, :lastfm_id, :string
  end
end
