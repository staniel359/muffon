class ProfileAlbum < ApplicationRecord
  belongs_to :profile, counter_cache: :albums_count
  belongs_to :album, counter_cache: :listeners_count
  belongs_to :profile_artist, counter_cache: :albums_count
  belongs_to :artist

  has_many :plays, dependent: :destroy
  has_many :playlist_tracks, dependent: :destroy

  validates :profile_id, :album_id, :profile_artist_id, presence: true

  scope :associated, -> { includes(:album, :artist) }
end
