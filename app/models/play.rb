class Play < ApplicationRecord
  belongs_to :profile
  belongs_to :profile_track
  belongs_to :album
end
