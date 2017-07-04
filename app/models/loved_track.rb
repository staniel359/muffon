class LovedTrack < ApplicationRecord
  belongs_to :profile
  belongs_to :track
  belongs_to :profile_track
  belongs_to :artist
  belongs_to :profile_artist
end
