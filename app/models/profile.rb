class Profile < ApplicationRecord
  validates :nickname, :email, presence: true, uniqueness: true
  validates :lastfm_id, uniqueness: true
  validates :password, presence: true, length: { minimum: 6 }, on: :create
  validates :password, length: { minimum: 6 }, on: :update, allow_blank: true
  has_secure_password
  mount_uploader :avatar, AvatarUploader
  has_many :profile_tracks, dependent: :destroy
  has_many :profile_artists, dependent: :destroy
  has_many :profile_albums, dependent: :destroy
  has_many :profile_tags, dependent: :destroy
  has_many :plays, dependent: :destroy
  has_many :recommendations, dependent: :destroy
  has_many :listened_artists, dependent: :destroy
  has_many :bookmarks, dependent: :destroy
  has_many :playlists, dependent: :destroy
  has_many :playlist_tracks, through: :playlists, dependent: :destroy
  has_many :messages

  def has_in_library(artist_id)
    profile_artists.find_by(artist_id: artist_id)
  end

  def has_in_library?(artist_id)
    has_in_library(artist_id)
  end

  def listened(artist)
    listened_artists.find_by(artist_name: artist)
  end

  def listened_to?(artist)
    listened(artist)
  end

  def bookmarked(artist)
    bookmarks.find_by(artist_name: artist)
  end

  def bookmarked?(artist)
    bookmarked(artist)
  end
  
  def conversations
    Conversation.where('sender_id = ? or recipient_id = ?', id, id).order('created_at desc')
  end
end
