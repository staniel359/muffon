class Profile < ApplicationRecord
	validates_presence_of :nickname, :email
	validates_uniqueness_of :nickname, :email, :lastfm_id
	validates :password, presence: true, length: {minimum: 6}, on: :create
	validates :password, length: {minimum: 6}, on: :update, allow_blank: true
	has_secure_password
	mount_uploader :avatar, AvatarUploader
	has_many :profile_tracks
	has_many :profile_artists
	has_many :profile_albums
	has_many :profile_tags
	has_many :plays
	has_many :loved_tracks
	has_many :recommendations
	has_many :listened_artists
	has_many :bookmarks

	def has_in_library(artist_id)
		self.profile_artists.find(artist_id)
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
