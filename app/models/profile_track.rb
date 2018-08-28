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

  scope :loved, -> { where(loved: true) }
  scope :loved_desc, -> { order(loved_at: :desc) }

  after_create_commit :increment_loved_tracks_count, if: :loved?

  def increment_loved_tracks_count
    profile.increment!(:loved_tracks_count)
  end
end
