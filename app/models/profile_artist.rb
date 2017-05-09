class ProfileArtist < ApplicationRecord
  belongs_to :profile
  belongs_to :artist
  has_many :profile_tracks
  has_many :profile_albums
  has_many :plays
end
