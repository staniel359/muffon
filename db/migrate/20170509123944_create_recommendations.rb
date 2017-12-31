class CreateRecommendations < ActiveRecord::Migration[5.1]
  def change
    create_table :recommendations do |t|
      t.belongs_to :profile, foreign_key: true
      t.belongs_to :artist, foreign_key: true
      t.integer :profile_artists, array: true, default: []
      t.integer :tags, array: true, default: []
      t.integer :deleted

      t.timestamps
    end
  end
end
