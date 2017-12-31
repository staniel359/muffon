class Album < ApplicationRecord
  belongs_to :artist
  has_many :profile_albums
  has_many :albums, through: :profile_albums
  has_many :taggings, as: :model
  has_many :plays
  has_many :playlist_tracks
  validates :title, :artist_id, presence: true

  def album_cover
    cover.present? ? cover : 'missing_album.png'
  end

  def album_tracks
    Track.find(tracks)
  end

  def album_tags
    Tag.find(tags)
  end

  def release_date
    return nil unless released_at.present?

    released_at.to_time.strftime('%e %b %Y').strip
  rescue ArgumentError
    released_at
  end

  def album_title
    title.include?('/') ? CGI.escape(title) : title
  end
end
