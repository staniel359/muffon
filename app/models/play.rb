class Play < ApplicationRecord
  belongs_to :profile
  belongs_to :profile_track
  belongs_to :track
  belongs_to :profile_album, optional: true
  belongs_to :album, optional: true
  belongs_to :profile_artist
  belongs_to :artist
  validates :profile_id, :profile_track_id, :track_id, :profile_artist_id, :artist_id, presence: true
end
