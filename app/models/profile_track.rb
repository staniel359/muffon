class ProfileTrack < ApplicationRecord
  belongs_to :profile, counter_cache: :tracks_count
  belongs_to :track
  belongs_to :profile_artist, counter_cache: :tracks_count
  belongs_to :artist
  has_many :plays, dependent: :destroy
  has_many :taggings, as: :profile_model
  has_many :profile_tags, through: :track_taggings
  has_many :playlist_tracks
  validates :profile_id,
            :track_id,
            :profile_artist_id,
            :artist_id,
            presence: true

  default_scope { order(playcount: :desc) }

  def artist_image
    image.present? ? image : 'missing_artist.png'
  end
end
