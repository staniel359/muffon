class PlaylistTrack < ApplicationRecord
  belongs_to :playlist, counter_cache: :tracks_count
  belongs_to :profile_track, optional: true
  belongs_to :track
  belongs_to :profile_artist, optional: true
  belongs_to :artist
  belongs_to :profile_album, optional: true
  belongs_to :album, optional: true

  validates :playlist_id, :track_id, :artist_id, presence: true

  def artist_image
    image.present? ? image : 'missing_artist.png'
  end

  def album_cover
    cover.present? ? cover : 'missing_album.png'
  end
end
