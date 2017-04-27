class Profile < ApplicationRecord
	validates_presence_of :nickname, :email
	validates_uniqueness_of :nickname, :email
	validates_length_of :password, minimum: 6
	has_secure_password
end
