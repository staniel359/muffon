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
      t.timestamps
    end
  end
end
