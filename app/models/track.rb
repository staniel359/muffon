class Track < ApplicationRecord
  belongs_to :artist
  has_many :profile_tracks
  has_many :profiles, through: :profile_tracks
  has_many :taggings, as: :model
  has_many :plays
  has_many :playlist_tracks
  validates :title, :artist_id, presence: true

  def track_title
    title.include?('/') ? CGI.escape(title) : title
  end
end
