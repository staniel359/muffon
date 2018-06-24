class Play < ApplicationRecord
  belongs_to :profile, counter_cache: :plays_count
  belongs_to :profile_track, counter_cache: :plays_count
  belongs_to :profile_artist, counter_cache: :plays_count
  belongs_to :profile_album, optional: true, counter_cache: :plays_count

  validates :profile_id, :profile_track_id, :profile_artist_id, presence: true

  after_create_commit :increment_counters

  def increment_counters
    profile_track.track.increment!(:plays_count)
    profile_artist.artist.increment!(:plays_count)
    profile_album&.album&.increment!(:plays_count)
  end
end
