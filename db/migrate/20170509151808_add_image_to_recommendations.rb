class AddImageToRecommendations < ActiveRecord::Migration[5.1]
  def change
    add_column :recommendations, :image, :string
  end
end
