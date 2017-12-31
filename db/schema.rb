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

ActiveRecord::Schema.define(version: 20171217130211) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "hstore"

  create_table "albums", force: :cascade do |t|
    t.string "title"
    t.bigint "artist_id"
    t.string "cover"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "mbid"
    t.integer "tags", default: [], array: true
    t.integer "tracks", default: [], array: true
    t.bigint "listeners"
    t.bigint "playcount"
    t.text "description"
    t.string "labels", default: [], array: true
    t.string "released_at"
    t.string "format"
    t.boolean "full", default: false
    t.string "role"
    t.integer "discogs_main_id"
    t.integer "discogs_ids", default: [], array: true
    t.index ["artist_id"], name: "index_albums_on_artist_id"
    t.index ["title"], name: "index_albums_on_title"
  end

  create_table "artists", force: :cascade do |t|
    t.string "name"
    t.string "image"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "mbid"
    t.bigint "discogs_ids", default: [], array: true
    t.bigint "listeners"
    t.bigint "playcount"
    t.text "description"
    t.bigint "similars", default: [], array: true
    t.integer "tags", default: [], array: true
    t.bigint "top_track_count"
    t.jsonb "official_releases", default: []
    t.string "info_status", default: "none"
    t.index ["name"], name: "index_artists_on_name"
  end

  create_table "bookmarks", force: :cascade do |t|
    t.bigint "profile_id"
    t.bigint "artist_id"
    t.bigint "album_id"
    t.bigint "track_id"
    t.string "image"
    t.string "is"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["album_id"], name: "index_bookmarks_on_album_id"
    t.index ["artist_id"], name: "index_bookmarks_on_artist_id"
    t.index ["profile_id"], name: "index_bookmarks_on_profile_id"
    t.index ["track_id"], name: "index_bookmarks_on_track_id"
  end

  create_table "conversations", force: :cascade do |t|
    t.integer "sender_id"
    t.integer "recipient_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "groups", force: :cascade do |t|
    t.integer "owner_id"
    t.string "name"
    t.string "avatar"
    t.integer "private"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "description"
  end

  create_table "labels", force: :cascade do |t|
    t.string "name"
    t.integer "discogs_id"
    t.string "image"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "listened_artists", force: :cascade do |t|
    t.bigint "profile_id"
    t.bigint "artist_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["artist_id"], name: "index_listened_artists_on_artist_id"
    t.index ["profile_id", "artist_id"], name: "index_listened_artists_on_profile_id_and_artist_id", unique: true
    t.index ["profile_id"], name: "index_listened_artists_on_profile_id"
  end

  create_table "memberships", force: :cascade do |t|
    t.bigint "group_id"
    t.integer "member_id"
    t.integer "role"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["group_id"], name: "index_memberships_on_group_id"
    t.index ["member_id", "group_id"], name: "index_memberships_on_member_id_and_group_id", unique: true
  end

  create_table "messages", force: :cascade do |t|
    t.bigint "conversation_id"
    t.bigint "profile_id"
    t.text "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "new"
    t.index ["conversation_id"], name: "index_messages_on_conversation_id"
    t.index ["profile_id"], name: "index_messages_on_profile_id"
  end

  create_table "playlist_tracks", force: :cascade do |t|
    t.bigint "playlist_id"
    t.bigint "profile_track_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "profile_artist_id"
    t.integer "artist_id"
    t.integer "track_id"
    t.integer "profile_album_id"
    t.integer "album_id"
    t.index ["playlist_id", "profile_track_id"], name: "index_playlist_tracks_on_playlist_id_and_profile_track_id", unique: true
    t.index ["playlist_id"], name: "index_playlist_tracks_on_playlist_id"
    t.index ["profile_track_id"], name: "index_playlist_tracks_on_profile_track_id"
  end

  create_table "playlists", force: :cascade do |t|
    t.bigint "profile_id"
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["profile_id", "name"], name: "index_playlists_on_profile_id_and_name", unique: true
    t.index ["profile_id"], name: "index_playlists_on_profile_id"
  end

  create_table "plays", force: :cascade do |t|
    t.bigint "profile_id"
    t.bigint "profile_track_id"
    t.bigint "track_id"
    t.bigint "profile_album_id"
    t.bigint "album_id"
    t.bigint "profile_artist_id"
    t.bigint "artist_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["album_id"], name: "index_plays_on_album_id"
    t.index ["artist_id"], name: "index_plays_on_artist_id"
    t.index ["profile_album_id"], name: "index_plays_on_profile_album_id"
    t.index ["profile_artist_id"], name: "index_plays_on_profile_artist_id"
    t.index ["profile_id"], name: "index_plays_on_profile_id"
    t.index ["profile_track_id"], name: "index_plays_on_profile_track_id"
    t.index ["track_id"], name: "index_plays_on_track_id"
  end

  create_table "profile_albums", force: :cascade do |t|
    t.bigint "profile_id"
    t.bigint "album_id"
    t.bigint "profile_artist_id"
    t.bigint "artist_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "playcount", default: 0
    t.integer "profile_tracks", default: [], array: true
    t.index ["album_id"], name: "index_profile_albums_on_album_id"
    t.index ["artist_id"], name: "index_profile_albums_on_artist_id"
    t.index ["profile_artist_id"], name: "index_profile_albums_on_profile_artist_id"
    t.index ["profile_id"], name: "index_profile_albums_on_profile_id"
  end

  create_table "profile_artists", force: :cascade do |t|
    t.bigint "profile_id"
    t.bigint "artist_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "playcount", default: 0
    t.integer "tracks_count", default: 0
    t.index ["artist_id"], name: "index_profile_artists_on_artist_id"
    t.index ["profile_id"], name: "index_profile_artists_on_profile_id"
  end

  create_table "profile_tags", force: :cascade do |t|
    t.bigint "profile_id"
    t.bigint "tag_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "taggings_count", default: 0
    t.integer "artist_taggings_count", default: 0
    t.integer "album_taggings_count", default: 0
    t.integer "track_taggings_count", default: 0
    t.index ["profile_id"], name: "index_profile_tags_on_profile_id"
    t.index ["tag_id"], name: "index_profile_tags_on_tag_id"
  end

  create_table "profile_tracks", force: :cascade do |t|
    t.bigint "profile_id"
    t.bigint "track_id"
    t.bigint "profile_artist_id"
    t.bigint "artist_id"
    t.integer "profile_albums", default: [], array: true
    t.integer "albums", default: [], array: true
    t.integer "loved"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "loved_at"
    t.integer "playcount", default: 0
    t.index ["artist_id"], name: "index_profile_tracks_on_artist_id"
    t.index ["profile_artist_id"], name: "index_profile_tracks_on_profile_artist_id"
    t.index ["profile_id"], name: "index_profile_tracks_on_profile_id"
    t.index ["track_id"], name: "index_profile_tracks_on_track_id"
  end

  create_table "profiles", id: :serial, force: :cascade do |t|
    t.string "nickname"
    t.string "email"
    t.string "password_digest"
    t.string "name"
    t.string "country"
    t.string "city"
    t.date "birthdate"
    t.string "gender"
    t.string "avatar"
    t.string "lastfm_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "top_artists_scope", default: 0
    t.integer "top_albums_scope", default: 0
    t.integer "top_tracks_scope", default: 0
    t.jsonb "new_messages", default: {}
    t.integer "plays_count", default: 0
    t.integer "tracks_count", default: 0
    t.integer "loved_tracks_count", default: 0
    t.integer "artists_count", default: 0
    t.integer "albums_count", default: 0
    t.integer "tags_count", default: 0
  end

  create_table "recommendations", force: :cascade do |t|
    t.bigint "profile_id"
    t.integer "tags", default: [], array: true
    t.integer "deleted"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "artist_id"
    t.integer "profile_artists", default: [], array: true
    t.index ["artist_id"], name: "index_recommendations_on_artist_id"
    t.index ["profile_id"], name: "index_recommendations_on_profile_id"
  end

  create_table "relationships", force: :cascade do |t|
    t.integer "follower_id"
    t.integer "followed_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["follower_id", "followed_id"], name: "index_relationships_on_follower_id_and_followed_id", unique: true
  end

  create_table "taggings", force: :cascade do |t|
    t.bigint "profile_id"
    t.bigint "tag_id"
    t.bigint "profile_tag_id"
    t.integer "model_id"
    t.string "model_type"
    t.integer "profile_model_id"
    t.string "profile_model_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["profile_id"], name: "index_taggings_on_profile_id"
    t.index ["profile_tag_id"], name: "index_taggings_on_profile_tag_id"
    t.index ["tag_id"], name: "index_taggings_on_tag_id"
  end

  create_table "tags", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tracks", force: :cascade do |t|
    t.string "title"
    t.bigint "artist_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "mbid"
    t.jsonb "albums", default: []
    t.string "video_link"
    t.text "audio_link"
    t.string "vk_id"
    t.index ["artist_id"], name: "index_tracks_on_artist_id"
    t.index ["title"], name: "index_tracks_on_title"
  end

  add_foreign_key "albums", "artists"
  add_foreign_key "bookmarks", "albums"
  add_foreign_key "bookmarks", "artists"
  add_foreign_key "bookmarks", "profiles"
  add_foreign_key "bookmarks", "tracks"
  add_foreign_key "listened_artists", "artists"
  add_foreign_key "listened_artists", "profiles"
  add_foreign_key "memberships", "groups"
  add_foreign_key "messages", "conversations"
  add_foreign_key "messages", "profiles"
  add_foreign_key "playlist_tracks", "playlists"
  add_foreign_key "playlist_tracks", "profile_tracks"
  add_foreign_key "playlists", "profiles"
  add_foreign_key "plays", "albums"
  add_foreign_key "plays", "artists"
  add_foreign_key "plays", "profile_albums"
  add_foreign_key "plays", "profile_artists"
  add_foreign_key "plays", "profile_tracks"
  add_foreign_key "plays", "profiles"
  add_foreign_key "plays", "tracks"
  add_foreign_key "profile_albums", "albums"
  add_foreign_key "profile_albums", "artists"
  add_foreign_key "profile_albums", "profile_artists"
  add_foreign_key "profile_albums", "profiles"
  add_foreign_key "profile_artists", "artists"
  add_foreign_key "profile_artists", "profiles"
  add_foreign_key "profile_tags", "profiles"
  add_foreign_key "profile_tags", "tags"
  add_foreign_key "profile_tracks", "artists"
  add_foreign_key "profile_tracks", "profile_artists"
  add_foreign_key "profile_tracks", "profiles"
  add_foreign_key "profile_tracks", "tracks"
  add_foreign_key "recommendations", "artists"
  add_foreign_key "recommendations", "profiles"
  add_foreign_key "taggings", "profile_tags"
  add_foreign_key "taggings", "profiles"
  add_foreign_key "taggings", "tags"
  add_foreign_key "tracks", "artists"
end
