class AddDeletedToRecommendations < ActiveRecord::Migration[5.1]
  def change
    add_column :recommendations, :deleted, :integer
  end
end
