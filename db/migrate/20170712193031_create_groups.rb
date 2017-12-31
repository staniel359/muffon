class CreateGroups < ActiveRecord::Migration[5.1]
  def change
    create_table :groups do |t|
      t.integer :owner_id
      t.string :name
      t.string :avatar
      t.integer :private
      t.text :description

      t.timestamps
    end
  end
end
