class Profile < ApplicationRecord
  validates :nickname, :email, presence: true, uniqueness: true
  validates :lastfm_id, uniqueness: true, allow_nil: true
  validates :password, presence: true, length: { minimum: 6 }, on: :create
  validates :password, length: { minimum: 6 }, on: :update, allow_blank: true

  has_secure_password

  mount_uploader :avatar, AvatarUploader

  has_many :profile_tracks, dependent: :destroy
  has_many :tracks, through: :profile_tracks
  has_many :loved_tracks, lambda {
    where(loved: 1).reorder(loved_at: :desc)
  }, class_name: 'ProfileTrack'

  has_many :profile_artists, dependent: :destroy
  has_many :artists, through: :profile_artists

  has_many :profile_albums, dependent: :destroy
  has_many :albums, through: :profile_albums

  has_many :profile_tags, dependent: :destroy
  has_many :tags, through: :profile_tags
  has_many :taggings, dependent: :destroy

  has_many :plays, dependent: :destroy

  has_many :recommendations, dependent: :destroy

  has_many :listened_artists, dependent: :destroy

  has_many :bookmarks, dependent: :destroy

  has_many :playlists, dependent: :destroy
  has_many :playlist_tracks, through: :playlists, dependent: :destroy

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
           foreign_key: 'followed_id',
           class_name: 'Relationship'
  has_many :followeds, through: :active_relationships
  has_many :followers, through: :passive_relationships

  has_many :own_groups, foreign_key: 'owner_id', class_name: 'Group'
  has_many :memberships, foreign_key: 'member_id', dependent: :destroy
  has_many :groups, through: :memberships

  def conversations
    active_conversations.or(passive_conversations)
  end

  def conversation_with(profile_id)
    conversations.where(
      'sender_id = ? or recipient_id = ?', profile_id, profile_id
    )
  end

  def new_conversation_with(profile_id)
    conversation_with(profile_id).first_or_create(recipient_id: profile_id)
  end
end
