class ProfileArtist < ApplicationRecord
  belongs_to :profile
  belongs_to :artist
  has_many :profile_tracks, dependent: :destroy
  has_many :profile_albums, dependent: :destroy
  has_many :plays, dependent: :destroy
  has_many :loved_tracks, dependent: :destroy
  validates :profile_id, :artist_id, presence: true
end
