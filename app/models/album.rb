class Album < ApplicationRecord
  belongs_to :artist
  has_many :profile_albums
  validates_presence_of :title
  validates_presence_of :artist_id
end
