class ProfileTrack < ApplicationRecord
  belongs_to :profile
  belongs_to :track
  belongs_to :profile_artist
  belongs_to :artist
  has_many :plays, dependent: :destroy
end
