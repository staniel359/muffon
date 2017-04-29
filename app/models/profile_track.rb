class ProfileTrack < ApplicationRecord
  belongs_to :profile
  belongs_to :track
  belongs_to :album
end
