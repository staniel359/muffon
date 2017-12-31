class Artist < ApplicationRecord
  has_many :tracks
  has_many :albums
  has_many :profile_artists
  has_many :profiles, through: :profile_artists
  has_many :loved_tracks
  has_many :taggings, as: :model
  has_many :plays
  has_many :playlist_tracks
  has_many :listened_artists
  has_many :bookmarks
  validates :name, presence: true, uniqueness: true

  def in_library?(profile)
    ProfileArtist.find_by(
      profile_id: profile.id,
      artist_id: id
    )
  end

  def bookmarked_by?(profile)
    Bookmark.find_by(
      profile_id: profile.id,
      artist_id: id
    )
  end

  def listened_by?(profile)
    ListenedArtist.find_by(
      profile_id: profile.id,
      artist_id: id
    )
  end

  def artist_image
    image.present? ? image : 'missing_artist.png'
  end

  def artist_name
    name.include?('/') ? CGI.escape(name) : name
  end

  def similar_artists
    Artist.find(similars)
  end

  def artist_tags
    Tag.find(tags)
  end
end
