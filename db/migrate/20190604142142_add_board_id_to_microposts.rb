class AddBoardIdToMicroposts < ActiveRecord::Migration[5.2]
  def change
    add_column :microposts, :board_id, :integer
  end
end
