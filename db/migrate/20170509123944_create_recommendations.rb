class CreateRecommendations < ActiveRecord::Migration[5.1]
  def change
    create_table :recommendations do |t|
      t.belongs_to :profile, foreign_key: true
      t.string :artist_name
      t.string :artists, array: true, default: []

      t.timestamps
    end
  end
end
