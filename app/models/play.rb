class Play < ApplicationRecord
  belongs_to :profile, counter_cache: :plays_count
  belongs_to :profile_track, counter_cache: :playcount
  belongs_to :track
  belongs_to :profile_album, optional: true, counter_cache: :playcount
  belongs_to :album, optional: true
  belongs_to :profile_artist, counter_cache: :playcount
  belongs_to :artist
  validates :profile_id,
            :profile_track_id,
            :track_id,
            :profile_artist_id,
            :artist_id,
            presence: true

  default_scope { order('created_at desc') }
end
