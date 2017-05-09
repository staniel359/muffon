class ProfileTrack < ApplicationRecord
  belongs_to :profile
  belongs_to :track
  belongs_to :profile_artist
  belongs_to :artist
  belongs_to :profile_album, optional: true
  belongs_to :album, optional: true
  has_many :plays
end
