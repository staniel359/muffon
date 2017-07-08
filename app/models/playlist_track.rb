class PlaylistTrack < ApplicationRecord
  belongs_to :playlist
  belongs_to :profile_track
  validates :playlist_id, :profile_track_id, presence: true
end
