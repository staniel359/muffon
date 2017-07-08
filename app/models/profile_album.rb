class ProfileAlbum < ApplicationRecord
  belongs_to :profile
  belongs_to :album
  belongs_to :profile_artist
  belongs_to :artist
  has_many :profile_tracks, dependent: :destroy
  has_many :plays, dependent: :destroy
  validates :profile_id, :album_id, :profile_artist_id, :artist_id, presence: true
end
