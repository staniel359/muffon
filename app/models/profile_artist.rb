class ProfileArtist < ApplicationRecord
  belongs_to :profile
  belongs_to :artist
  has_many :profile_tracks, dependent: :destroy
  has_many :profile_albums, dependent: :destroy
  has_many :plays, dependent: :destroy
end
