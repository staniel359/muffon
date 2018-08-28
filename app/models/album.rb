class Album < ApplicationRecord
  belongs_to :artist

  has_many :profile_albums
  has_many :profiles, through: :profile_albums
  has_many :taggings, as: :model
  has_many :plays
  has_many :playlist_tracks
  has_many :taggings, as: :taggable

  validates :title, :artist_id, presence: true

  def self.with(title:, artist_id:)
    where(artist_id: artist_id).where(
      'LOWER(title) = ?', title.downcase
    )
  end
end
