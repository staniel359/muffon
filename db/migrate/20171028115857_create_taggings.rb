class CreateTaggings < ActiveRecord::Migration[5.1]
  def change
    create_table :taggings do |t|
      t.belongs_to :profile, foreign_key: true
      t.belongs_to :tag, foreign_key: true
      t.belongs_to :profile_tag, foreign_key: true
      t.integer :model_id
      t.string :model_type
      t.integer :profile_model_id
      t.string :profile_model_type

      t.timestamps
    end
  end
end
