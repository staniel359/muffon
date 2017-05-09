class ProfileAlbum < ApplicationRecord
  belongs_to :profile
  belongs_to :album
  belongs_to :profile_artist
  belongs_to :artist
  has_many :profile_tracks
  has_many :plays
  validates_presence_of :album_id
end
