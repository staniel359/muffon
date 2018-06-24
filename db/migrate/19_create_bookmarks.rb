class CreateBookmarks < ActiveRecord::Migration[5.1]
  def change
    create_table :bookmarks do |t|
      t.references :bookmarkable, polymorphic: true, index: true

      t.belongs_to :profile, foreign_key: true

      t.timestamps
    end
  end
end
