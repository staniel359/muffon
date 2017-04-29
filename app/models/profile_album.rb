class ProfileAlbum < ApplicationRecord
  belongs_to :profile
  belongs_to :album
end
