class CreateComments < ActiveRecord::Migration[5.2]
  def change
    create_table :comments do |t|
      t.references :commentable, polymorphic: true, index: true

      t.belongs_to :profile, foreign_key: true
      t.text :content

      t.timestamps
    end
  end
end
