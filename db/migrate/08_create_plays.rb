class CreatePlays < ActiveRecord::Migration[5.1]
  def change
    create_table :plays do |t|
      t.belongs_to :profile,        foreign_key: true
      t.belongs_to :profile_track,  foreign_key: true
      t.belongs_to :track,          foreign_key: true
      t.belongs_to :profile_album,  foreign_key: true
      t.belongs_to :album,          foreign_key: true
      t.belongs_to :profile_artist, foreign_key: true
      t.belongs_to :artist,         foreign_key: true

      t.timestamps
    end
  end
end
