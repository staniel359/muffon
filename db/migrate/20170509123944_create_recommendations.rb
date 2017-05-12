class CreateRecommendations < ActiveRecord::Migration[5.1]
  def change
    create_table :recommendations do |t|
      t.belongs_to :profile, foreign_key: true
      t.string :artist_name
      t.integer :profile_artists, array: true, default: []
      t.integer :tags, array: true, default: []
      t.string :image
      t.integer :deleted

      t.timestamps
    end
  end
end
