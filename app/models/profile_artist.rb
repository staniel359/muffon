class ProfileArtist < ApplicationRecord
  belongs_to :profile
  belongs_to :artist
end
