class AddInfoToProfiles < ActiveRecord::Migration[5.0]
  def change
    add_column :profiles, :name, :string
    add_column :profiles, :country, :string
    add_column :profiles, :city, :string
    add_column :profiles, :birthdate, :date
    add_column :profiles, :gender, :string
  end
end
