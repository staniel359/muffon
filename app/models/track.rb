class Track < ApplicationRecord
  belongs_to :artist
  has_many :profile_tracks
  validates_presence_of :title, :artist_id
end
