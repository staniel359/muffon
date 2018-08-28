class CreateProfiles < ActiveRecord::Migration[5.2]
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

      t.integer :artists_scope, default: 0
      t.integer :albums_scope,  default: 0
      t.integer :tracks_scope,  default: 0

      t.integer :plays_count,        limit: 8, default: 0
      t.integer :artists_count,      limit: 8, default: 0
      t.integer :albums_count,       limit: 8, default: 0
      t.integer :tracks_count,       limit: 8, default: 0
      t.integer :loved_tracks_count, limit: 8, default: 0
      t.integer :tags_count,         limit: 8, default: 0

      t.boolean :lastfm_import_completed, default: false

      t.timestamps
    end
    add_index :profiles, [:nickname, :country, :city]
  end
end
