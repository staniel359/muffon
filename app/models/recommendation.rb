class Recommendation < ApplicationRecord
  belongs_to :profile
  belongs_to :artist
  validates :profile_id, :artist_id, presence: true
  validates :profile_artists, length: { minimum: 0 }, allow_nil: false

  default_scope { order('array_length(profile_artists, 1) desc') }

  def artists(days, limit)
    Recommendations::RecommendationArtists.call(
      profile_artists: profile_artists,
      days: days, limit: limit
    )
  end

  def recommendation_tags
    Tag.find(tags)
  end
end
