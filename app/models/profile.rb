class Profile < ApplicationRecord
	validates_presence_of :nickname, :email
	validates_uniqueness_of :nickname, :email, :lastfm_id
	validates :password, presence: true, length: {minimum: 6}, on: :create
	validates :password, length: {minimum: 6}, on: :update, allow_blank: true
	has_secure_password
	mount_uploader :avatar, AvatarUploader
	has_many :profile_tracks, dependent: :destroy
	has_many :profile_artists, dependent: :destroy
	has_many :profile_albums, dependent: :destroy
	has_many :profile_tags, dependent: :destroy
	has_many :plays, dependent: :destroy
	has_many :loved_tracks, dependent: :destroy
	has_many :recommendations, dependent: :destroy
	has_many :listened_artists, dependent: :destroy
	has_many :bookmarks, dependent: :destroy

	def has_in_library(artist_id)
		self.profile_artists.find_by(artist_id: artist_id)
	end

	def has_in_library?(artist_id)
		self.has_in_library(artist_id)
	end

	def listened(artist)
		self.listened_artists.find_by(artist_name: artist)
	end

	def listened_to?(artist)
		self.listened(artist)
	end

	def bookmarked(artist)
		self.bookmarks.find_by(artist_name: artist)
	end

	def bookmarked?(artist)
		self.bookmarked(artist)
	end
end
