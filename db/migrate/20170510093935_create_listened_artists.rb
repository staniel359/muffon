class CreateListenedArtists < ActiveRecord::Migration[5.1]
  def change
    create_table :listened_artists do |t|
      t.belongs_to :profile, foreign_key: true
      t.string :artist_name

      t.timestamps
    end
  end
end
