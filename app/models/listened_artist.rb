class ListenedArtist < ApplicationRecord
  belongs_to :profile
  validates_presence_of :artist_name
end
