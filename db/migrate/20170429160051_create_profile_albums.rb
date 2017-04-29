class CreateProfileAlbums < ActiveRecord::Migration[5.1]
  def change
    create_table :profile_albums do |t|
      t.belongs_to :profile, foreign_key: true
      t.belongs_to :album, foreign_key: true

      t.timestamps
    end
  end
end
