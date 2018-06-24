class Playlist < ApplicationRecord
  belongs_to :profile

  has_many :playlist_tracks, dependent: :destroy
  has_many :tracks, through: :playlist_tracks

  validates :profile_id, :name, presence: true
end
