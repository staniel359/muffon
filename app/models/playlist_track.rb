class PlaylistTrack < ApplicationRecord
  belongs_to :playlist
  belongs_to :profile_track
  belongs_to :track
  belongs_to :profile_artist
  belongs_to :artist
  belongs_to :profile_album, optional: true
  belongs_to :album, optional: true
  validates :playlist_id,
            :profile_track_id,
            :track_id,
            :profile_artist_id,
            :artist_id,
            presence: true

  default_scope -> { order(created_at: :asc) }

  def artist_image
    image.present? ? image : 'missing_artist.png'
  end

  def album_cover
    cover.present? ? cover : 'missing_album.png'
  end
end
