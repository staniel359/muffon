class CreateProfileTags < ActiveRecord::Migration[5.1]
  def change
    create_table :profile_tags do |t|
      t.belongs_to :profile, foreign_key: true
      t.belongs_to :tag, foreign_key: true
      t.integer :taggings_count, default: 0
      t.integer :artist_taggings_count, default: 0
      t.integer :album_taggings_count, default: 0
      t.integer :track_taggings_count, default: 0

      t.timestamps
    end
  end
end
