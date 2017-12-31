class CreateBookmarks < ActiveRecord::Migration[5.1]
  def change
    create_table :bookmarks do |t|
      t.belongs_to :profile, foreign_key: true
      t.belongs_to :artist, foreign_key: true
      t.belongs_to :album, foreign_key: true
      t.belongs_to :track, foreign_key: true
      t.string :image
      t.string :is

      t.timestamps
    end
  end
end
