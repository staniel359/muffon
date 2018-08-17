class Play < ApplicationRecord
  belongs_to :profile, counter_cache: :plays_count
  belongs_to :profile_track, counter_cache: :plays_count
  belongs_to :track, counter_cache: :plays_count
  belongs_to :profile_artist, counter_cache: :plays_count
  belongs_to :artist, counter_cache: :plays_count
  belongs_to :profile_album, optional: true, counter_cache: :plays_count
  belongs_to :album, optional: true, counter_cache: :plays_count

  default_scope { includes(:artist, :album, :profile_track, :track) }

  validates :profile_id,
            :profile_track_id,
            :track_id,
            :profile_artist_id,
            :artist_id,
            presence: true
end
