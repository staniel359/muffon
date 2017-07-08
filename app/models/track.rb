class Track < ApplicationRecord
  belongs_to :artist
  has_many :profile_tracks
  validates :title, :artist_id, presence: true
end
