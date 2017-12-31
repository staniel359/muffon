class ProfileArtist < ApplicationRecord
  belongs_to :profile, counter_cache: :artists_count
  belongs_to :artist
  has_many :profile_tracks, dependent: :destroy
  has_many :profile_albums, dependent: :destroy
  has_many :plays, dependent: :destroy
  has_many :loved_tracks
  has_many :taggings, as: :profile_model
  has_many :profile_tags, through: :artist_taggings
  has_many :playlist_tracks
  validates :profile_id, :artist_id, presence: true

  default_scope { order(playcount: :desc) }

  def recommendations
    profile.recommendations.where('? = any(profile_artists)', id)
  end

  def artist_image
    image.present? ? image : 'missing_artist.png'
  end
end
