class Playlist < ApplicationRecord
  belongs_to :profile
  has_many :playlist_tracks, dependent: :destroy
  validates :profile_id, :name, presence: true
end
