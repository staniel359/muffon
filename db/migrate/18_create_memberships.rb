class CreateMemberships < ActiveRecord::Migration[5.1]
  def change
    create_table :memberships do |t|
      t.integer :member_id
      t.integer :role

      t.belongs_to :group, foreign_key: true

      t.timestamps
    end
    add_index :memberships, [:member_id, :group_id], unique: true
  end
end
