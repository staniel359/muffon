class Profile < ApplicationRecord
	validates_presence_of :nickname, :email
	validates_uniqueness_of :nickname, :email, :lastfm_id
	validates_length_of :password, minimum: 6
	has_secure_password
	mount_uploader :avatar, AvatarUploader
	has_many :profile_tracks
	has_many :profile_artists
	has_many :profile_albums
	has_many :plays
end
