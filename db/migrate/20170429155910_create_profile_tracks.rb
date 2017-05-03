class CreateProfileTracks < ActiveRecord::Migration[5.1]
  def change
    create_table :profile_tracks do |t|
      t.belongs_to :profile, foreign_key: true
      t.belongs_to :track, foreign_key: true

      t.timestamps
    end
  end
end
