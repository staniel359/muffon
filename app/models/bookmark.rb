class Bookmark < ApplicationRecord
  belongs_to :profile
  validates :profile_id, :artist_name, :is, presence: true
end
