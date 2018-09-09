class PlaylistTrack < ApplicationRecord
  belongs_to :playlist, counter_cache: :tracks_count
  belongs_to :profile
  belongs_to :track
  belongs_to :artist
  belongs_to :album, optional: true

  validates :playlist_id, :track_id, :artist_id, presence: true

  scope :associated, -> { includes(:artist, [track: :artist], :album) }
end
