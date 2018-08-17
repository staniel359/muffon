class ProfileTrack < ApplicationRecord
  belongs_to :profile, counter_cache: :tracks_count
  belongs_to :track, counter_cache: :listeners_count
  belongs_to :profile_artist, counter_cache: :tracks_count
  belongs_to :artist

  has_many :plays, dependent: :destroy
  has_many :taggings, as: :profile_model
  has_many :profile_tags, through: :track_taggings
  has_many :playlist_tracks, dependent: :destroy

  validates :profile_id, :track_id, :profile_artist_id, presence: true

  default_scope { includes(:track, :artist) }
  scope :loved, -> { where(loved: true) }

  def albums
    ProfileAlbum.where(id: profile_album_ids)
  end
end
