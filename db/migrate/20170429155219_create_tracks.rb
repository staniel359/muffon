class CreateTracks < ActiveRecord::Migration[5.1]
  def change
    create_table :tracks do |t|
      t.string :title
      t.belongs_to :artist, foreign_key: true
      t.string :mbid
      t.jsonb :albums, default: []
      t.string :video_link
      t.string :audio_link
      t.string :vk_id

      t.timestamps
    end
    add_index :tracks, :title
  end
end
