class Artist < ApplicationRecord
  has_many :tracks
  has_many :albums
  has_many :profile_artists
  has_many :profiles, through: :profile_artists
  has_many :plays
  has_many :loved_tracks
  has_many :taggings, as: :model
  has_many :plays
  has_many :playlist_tracks
  has_many :listened_artists
  has_many :bookmarks
  has_many :taggings, as: :taggable

  validates :name, presence: true, uniqueness: true

  def self.with(name:)
    where('LOWER(name) = ?', name.downcase).first_or_initialize
  end

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
    image || 'missing_artist.png'
  end

  def top_tracks
    Track.find(top_track_ids)
  end

  def top_albums
    Album.find(top_album_ids)
  end

  def similar_artists
    Artist.find(similar_artist_ids)
  end

  def tags
    Tag.find(tag_ids)
  end
end
