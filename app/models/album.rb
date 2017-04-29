class Album < ApplicationRecord
  belongs_to :artist
  has_many :profile_albums
end
