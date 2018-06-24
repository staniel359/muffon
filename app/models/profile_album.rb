class ProfileAlbum < ApplicationRecord
  belongs_to :profile, counter_cache: :albums_count
  belongs_to :album, counter_cache: :listeners_count
  belongs_to :profile_artist, counter_cache: :albums_count

  has_many :plays, dependent: :destroy
  has_many :taggings, as: :profile_model
  has_many :profile_tags, through: :album_taggings
  has_many :playlist_tracks, dependent: :destroy

  validates :profile_id, :album_id, :profile_artist_id, presence: true

  def profile_tracks
    ProfileTrack.where(id: profile_track_ids)
  end

  def tracks
    Track.where(id: profile_tracks.pluck(:track_id))
  end

  def album_cover
    cover.present? ? cover : 'missing_album.png'
  end

  def album_title
    title.include?('/') ? CGI.escape(title) : title
  end

  def artist_name
    name.include?('/') ? CGI.escape(name) : name
  end
end
