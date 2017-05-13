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
		@title = 'Recommendations'
		respond_to do |format|
			format.html
			format.js
		end
		if params[:artist]
			artist = Artist.find_by('lower(name) = lower(?)', params[:artist])
			if artist
				profile_artist = @profile.profile_artists.find_by(artist_id: artist.id)
				@recs = @profile.recommendations.where("'?' = any(profile_artists) and deleted is null", profile_artist.id).order('array_length(profile_artists, 1) desc').paginate(page: params[:page], per_page: 20)
			end
		elsif params[:tag]
			tag = Tag.find_by('lower(name) = lower(?)', params[:tag])
			if tag
				@recs = @profile.recommendations.where("'?' = any(tags) and deleted is null", tag.id).order('array_length(profile_artists, 1) desc').paginate(page: params[:page], per_page: 20)
			end
		elsif params[:date]
			profile_artist_ids = @profile.plays.where('created_at > ?', Time.now-params[:date].to_i.days).select(:profile_artist_id).group(:profile_artist_id).order('count(*) desc').pluck(:profile_artist_id)
			if !profile_artist_ids.empty?
				@recs = @profile.recommendations.where('profile_artists && array[?]', profile_artist_ids).order('array_length(profile_artists, 1) desc').paginate(page: params[:page], per_page: 20)
			end
		else
			@recs = @profile.recommendations.where(deleted: nil).order('array_length(profile_artists, 1) desc').paginate(page: params[:page], per_page: 20, total_entries: 400)
		end
		if params[:delete] || params[:restore]
			if params[:delete]
				rec = current_profile.recommendations.find_by(id: params[:delete])
				rec.update!(deleted: 1)
			elsif params[:restore]
				rec = current_profile.recommendations.find_by(id: params[:restore])
				rec.update!(deleted: nil)
			end
			respond_to :js
		end
	end

	def create_listened_artist
		current_profile.listened_artists.build(artist_name: params[:artist_name]).save
		current_profile.recommendations.find_or_create_by(artist_name: params[:artist_name]).update(deleted: 1)
		respond_to :js
	end

	def destroy_listened_artist
		current_profile.listened_artists.find_by(artist_name: params[:artist_name]).destroy
		current_profile.recommendations.find_or_create_by(artist_name: params[:artist_name]).update(deleted: nil)
		respond_to :js
	end

	private

		def set_profile
			@profile = current_profile
		end
	
end
