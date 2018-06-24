class Profile < ApplicationRecord
  has_many :profile_tracks, dependent: :destroy
  has_many :tracks, through: :profile_tracks
  has_many :loved_tracks, -> { where(loved: true) }, class_name: 'ProfileTrack'

  has_many :profile_artists, dependent: :destroy
  has_many :artists, through: :profile_artists

  has_many :profile_albums, dependent: :destroy
  has_many :albums, through: :profile_albums

  has_many :profile_tags, dependent: :destroy
  has_many :taggings, through: :profile_tags

  has_many :plays, dependent: :destroy

  has_many :recommendations, dependent: :destroy

  has_many :listened_artists, dependent: :destroy

  has_many :bookmarks, dependent: :destroy

  has_many :playlists, dependent: :destroy
  has_many :playlist_tracks, through: :playlists

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

  def new_messages
    redis.lrange("#{id}:new_messages", 0, -1)
  end

  def follow(profile_id)
    active_relationships.create(followed_id: profile_id)
  end

  def unfollow(profile_id)
    active_relationships.find_by(followed_id: profile_id)&.destroy
  end

  def join_group(group_id)
    memberships.create(group_id: group_id, role: 'member')
  end

  def leave_group(group_id)
    memberships.find_by(group_id: group_id)&.destroy
  end

  def artist_taggings(artist_id)
    taggings.where(
      taggable_type: 'Artist',
      taggable_id: artist_id
    )
  end
end
