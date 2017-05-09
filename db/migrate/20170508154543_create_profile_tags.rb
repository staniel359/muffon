class CreateProfileTags < ActiveRecord::Migration[5.1]
  def change
    create_table :profile_tags do |t|
      t.belongs_to :profile, foreign_key: true
      t.belongs_to :tag, foreign_key: true
      t.integer :count

      t.timestamps
    end
  end
end
