class Playlist < ApplicationRecord
  belongs_to :profile
  has_many :playlist_tracks, dependent: :destroy
  validates_presence_of :name
end
