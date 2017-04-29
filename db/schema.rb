# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170429180846) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "albums", force: :cascade do |t|
    t.string "title"
    t.bigint "artist_id"
    t.string "cover"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["artist_id"], name: "index_albums_on_artist_id"
  end

  create_table "artists", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "plays", force: :cascade do |t|
    t.bigint "profile_id"
    t.bigint "profile_track_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["profile_id"], name: "index_plays_on_profile_id"
    t.index ["profile_track_id"], name: "index_plays_on_profile_track_id"
  end

  create_table "profile_albums", force: :cascade do |t|
    t.bigint "profile_id"
    t.bigint "album_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["album_id"], name: "index_profile_albums_on_album_id"
    t.index ["profile_id"], name: "index_profile_albums_on_profile_id"
  end

  create_table "profile_artists", force: :cascade do |t|
    t.bigint "profile_id"
    t.bigint "artist_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["artist_id"], name: "index_profile_artists_on_artist_id"
    t.index ["profile_id"], name: "index_profile_artists_on_profile_id"
  end

  create_table "profile_tracks", force: :cascade do |t|
    t.bigint "profile_id"
    t.bigint "track_id"
    t.bigint "album_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "loved"
    t.index ["album_id"], name: "index_profile_tracks_on_album_id"
    t.index ["profile_id"], name: "index_profile_tracks_on_profile_id"
    t.index ["track_id"], name: "index_profile_tracks_on_track_id"
  end

  create_table "profiles", id: :serial, force: :cascade do |t|
    t.string "nickname"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
    t.string "country"
    t.string "city"
    t.date "birthdate"
    t.string "gender"
    t.string "avatar"
    t.string "lastfm_id"
  end

  create_table "tracks", force: :cascade do |t|
    t.string "title"
    t.bigint "artist_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["artist_id"], name: "index_tracks_on_artist_id"
  end

  add_foreign_key "albums", "artists"
  add_foreign_key "plays", "profile_tracks"
  add_foreign_key "plays", "profiles"
  add_foreign_key "profile_albums", "albums"
  add_foreign_key "profile_albums", "profiles"
  add_foreign_key "profile_artists", "artists"
  add_foreign_key "profile_artists", "profiles"
  add_foreign_key "profile_tracks", "albums"
  add_foreign_key "profile_tracks", "profiles"
  add_foreign_key "profile_tracks", "tracks"
  add_foreign_key "tracks", "artists"
end
