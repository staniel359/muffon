class CreateGroups < ActiveRecord::Migration[5.1]
  def change
    create_table :groups do |t|
      t.integer :owner_id
      t.string :name
      t.string :avatar
      t.text :description
      t.integer :members_count

      t.boolean :private, default: false

      t.timestamps
    end
  end
end
