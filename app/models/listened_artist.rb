class ListenedArtist < ApplicationRecord
  belongs_to :profile
  validates_presence_of :profile_id, :artist_name
end
