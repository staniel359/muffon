class CreateMicroposts < ActiveRecord::Migration[5.2]
  def change
    create_table :microposts do |t|
      t.belongs_to :profile, foreign_key: true
      t.text :content

      t.timestamps
    end
  end
end
