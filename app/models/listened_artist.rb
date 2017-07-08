class ListenedArtist < ApplicationRecord
  belongs_to :profile
  validates :profile_id, :artist_name, presence: true
end
