class CreateAlbums < ActiveRecord::Migration[5.1]
  def change
    create_table :albums do |t|
      t.string :title
      t.belongs_to :artist, foreign_key: true
      t.string :cover

      t.timestamps
    end
  end
end
