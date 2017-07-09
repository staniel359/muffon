class AddNewToMessages < ActiveRecord::Migration[5.1]
  def change
    add_column :messages, :new, :integer
  end
end
