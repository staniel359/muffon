class MuffonController < ApplicationController
	before_action :should_login, only: :settings

	def welcome
		@title = 'Welcome'
	end

	def settings
		@title = 'Settings'
		@profile = current_profile
	end
	
end
