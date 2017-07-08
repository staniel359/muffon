class Recommendation < ApplicationRecord
  belongs_to :profile
  validates :profile_id, :artist_name, :profile_artists, presence: true
end
