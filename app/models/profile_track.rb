class ProfileTrack < ApplicationRecord
  belongs_to :profile
  belongs_to :track
  belongs_to :profile_artist
  belongs_to :artist
  has_many :plays, dependent: :destroy
  validates :profile_id, :track_id, :profile_artist_id, :artist_id, presence: true
end
