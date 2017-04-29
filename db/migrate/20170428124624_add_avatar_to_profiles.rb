class AddAvatarToProfiles < ActiveRecord::Migration[5.0]
  def change
    add_column :profiles, :avatar, :string
  end
end
