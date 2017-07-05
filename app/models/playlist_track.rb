class PlaylistTrack < ApplicationRecord
  belongs_to :playlist
  belongs_to :profile_track
  validates_presence_of :playlist_id, :profile_track_id
end
