class ProfileAlbum < ApplicationRecord
  belongs_to :profile, counter_cache: :albums_count
  belongs_to :album
  belongs_to :profile_artist
  belongs_to :artist
  has_many :plays, dependent: :destroy
  has_many :taggings, as: :profile_model
  has_many :profile_tags, through: :album_taggings
  has_many :playlist_tracks
  validates :profile_id,
            :album_id,
            :profile_artist_id,
            :artist_id,
            presence: true

  default_scope { order(playcount: :desc) }

  def tracks
    profile.profile_tracks.where(id: profile_tracks)
  end

  def album_cover
    cover.present? ? cover : 'missing_album.png'
  end
end
