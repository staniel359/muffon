class Track < ApplicationRecord
  belongs_to :artist
  has_many :profile_tracks
end
