class Artist < ApplicationRecord
  has_many :tracks
  has_many :albums
  has_many :profile_artists
  has_many :listeners, through: :profile_artists, source: :profile
  has_many :plays
  has_many :playlist_tracks
  has_many :listened_artists
  has_many :bookmarks, as: :bookmarkable
  has_many :taggings, as: :taggable
  has_many :profile_tags, through: :taggings

  validates :name, presence: true, uniqueness: true

  def self.with(name:)
    where('LOWER(name) = ?', name.downcase)
  end
end
