class MuffonController < ApplicationController
	before_action :should_login, only: :settings
	before_action :set_profile

	def home
		@title = (logged_in? ? 'Home' : 'Welcome')
	end

	def settings
		@title = 'Settings'
		@button_text = "Save changes"
	end

	def recommendations
		@recs = @profile.recommendations.order('array_length(artists, 1) desc').paginate(page: params[:page], per_page: 20, total_entries: 400)
		@title = 'Recommendations'
		if params[:delete]
			@profile.recommendations.find_by(id: params[:delete]).destroy
			respond_to :js
		end
	end

	private

		def set_profile
			@profile = current_profile
		end
	
end
