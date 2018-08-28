class CreateRecommendations < ActiveRecord::Migration[5.2]
  def change
    create_table :recommendations do |t|
      t.belongs_to :profile, foreign_key: true
      t.belongs_to :artist,  foreign_key: true

      t.integer :profile_artist_ids, array: true, default: []
      t.integer :tag_ids,            array: true, default: []

      t.boolean :deleted, default: false

      t.timestamps
    end
  end
end
