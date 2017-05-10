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
		if params[:delete] || params[:restore] || params[:listened]
			if params[:delete]
				rec = @profile.recommendations.find_by(id: params[:delete])
				rec.update!(deleted: 1)
			elsif params[:restore]
				rec = @profile.recommendations.find_by(id: params[:restore])
				rec.update!(deleted: nil)
			elsif params[:listened]
				@profile.listened_artists.build(artist_name: params[:listened])
				@profile.save!
			end
			respond_to :js
		end
	end

	private

		def set_profile
			@profile = current_profile
		end
	
end
