class Recommendation < ApplicationRecord
  belongs_to :profile
  belongs_to :artist

  validates :profile_id, :artist_id, presence: true
  validates :profile_artist_ids, length: { minimum: 0 }, allow_nil: false

  scope :artists_count_desc, lambda {
    order(Arel.sql('array_length(profile_artist_ids, 1) desc'))
  }
  scope :not_deleted, -> { where(deleted: false) }

  def tags
    Tag.find(tag_ids)
  end

  def profile_artists(days = nil)
    Recommendations::ProfileArtists.call(
      profile_artist_ids: profile_artist_ids,
      days:               days
    )
  end
end
