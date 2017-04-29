class MuffonController < ApplicationController
	before_action :should_login, only: :settings

	def home
		@title = (logged_in? ? 'Home' : 'Welcome')
	end

	def settings
		@title = 'Settings'
		@profile = current_profile
		@button_text = "Save changes"
	end
	
end
