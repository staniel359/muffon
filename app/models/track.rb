class Track < ApplicationRecord
  belongs_to :artist

  has_many :profile_tracks
  has_many :profiles, through: :profile_tracks
  has_many :taggings, as: :model
  has_many :plays
  has_many :playlist_tracks
  has_many :taggings, as: :taggable

  validates :title, :artist_id, presence: true

  default_scope { includes(:artist) }

  def self.with(title:, artist_id:)
    where(artist_id: artist_id).where(
      'LOWER(title) = ?', title.downcase
    ).first_or_initialize(title: title)
  end

  def track_title
    title.include?('/') ? CGI.escape(title) : title
  end
end
