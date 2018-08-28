class ProfileArtist < ApplicationRecord
  belongs_to :profile, counter_cache: :artists_count
  belongs_to :artist, counter_cache: :listeners_count

  has_many :profile_tracks, dependent: :destroy
  has_many :profile_albums, dependent: :destroy
  has_many :plays, dependent: :destroy
  has_many :loved_tracks, -> { where(loved: 1) }, class_name: 'ProfileTrack'
  has_many :taggings, as: :taggable
  has_many :profile_tags, through: :artist_taggings
  has_many :playlist_tracks

  validates :profile_id, :artist_id, presence: true
end
