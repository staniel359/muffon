class Profile < ApplicationRecord
  has_many :profile_tracks, dependent: :delete_all
  has_many :tracks, through: :profile_tracks
  has_many :loved_tracks, -> { where(loved: true) }, class_name: 'ProfileTrack'

  has_many :profile_artists, dependent: :delete_all
  has_many :artists, through: :profile_artists

  has_many :profile_albums, dependent: :delete_all
  has_many :albums, through: :profile_albums

  has_many :profile_tags, dependent: :delete_all
  has_many :taggings, through: :profile_tags

  has_many :plays, dependent: :delete_all
  has_many :recommendations, dependent: :delete_all
  has_many :listened_artists, dependent: :delete_all
  has_many :bookmarks, dependent: :delete_all

  has_many :playlists, dependent: :delete_all
  has_many :playlist_tracks, dependent: :delete_all

  has_many :messages
  has_many :active_conversations,
           foreign_key: 'sender_id',
           class_name: 'Conversation'
  has_many :passive_conversations,
           foreign_key: 'recipient_id',
           class_name: 'Conversation'

  has_many :active_relationships,
           foreign_key: 'follower_id',
           class_name: 'Relationship'
  has_many :passive_relationships,
           foreign_key: 'following_id',
           class_name: 'Relationship'
  has_many :followings, through: :active_relationships
  has_many :followers, through: :passive_relationships

  has_many :memberships, foreign_key: 'member_id', dependent: :destroy
  has_many :groups, through: :memberships
  has_many :own_groups, foreign_key: 'owner_id', class_name: 'Group'

  validates :nickname, :email, presence: true, uniqueness: true
  validates :nickname, length: { minimum: 1, maximum: 50 }
  validates :password, presence: true, length: { minimum: 6 }, on: :create
  validates :password, length: { minimum: 6 }, on: :update, allow_blank: true

  has_secure_password

  mount_uploader :avatar, AvatarUploader

  def artist_bookmarks
    bookmarks.where(bookmarkable_type: 'Artist')
  end

  def album_bookmarks
    bookmarks.where(bookmarkable_type: 'Album')
  end

  def track_bookmarks
    bookmarks.where(bookmarkable_type: 'Track')
  end

  def conversations
    Conversation.where(
      'sender_id = :self OR recipient_id = :self', self: id
    )
  end

  def conversation_with(profile_id)
    conversations.where(
      'sender_id = :other OR recipient_id = :other',
      other: profile_id
    ).first_or_create(sender_id: id, recipient_id: profile_id)
  end
end
