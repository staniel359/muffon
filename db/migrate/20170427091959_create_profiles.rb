class CreateProfiles < ActiveRecord::Migration[5.0]
  def change
    create_table :profiles do |t|
      t.string :nickname
      t.string :email
      t.string :password_digest
      t.string :name
      t.string :country
      t.string :city
      t.date :birthdate
      t.string :gender
      t.string :avatar
      t.string :lastfm_id
      t.string :library_artists_scope
      t.string :library_albums_scope
      t.integer :top_artists_scope, default: 0
      t.integer :top_albums_scope, default: 0
      t.integer :top_tracks_scope, default: 0
      t.jsonb :new_messages, default: {}
      t.integer :playcount, default: 0
      t.integer :plays_count, default: 0
      t.integer :tracks_count, default: 0
      t.integer :loved_tracks_count, default: 0
      t.integer :artists_count, default: 0
      t.integer :albums_count, default: 0
      t.integer :tags_count, default: 0

      t.timestamps
    end
  end
end
