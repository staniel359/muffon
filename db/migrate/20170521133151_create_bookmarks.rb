class CreateBookmarks < ActiveRecord::Migration[5.1]
  def change
    create_table :bookmarks do |t|
      t.belongs_to :profile, foreign_key: true
      t.string :artist_name
      t.string :track_title
      t.string :album_title
      t.string :image
      t.string :is

      t.timestamps
    end
  end
end
