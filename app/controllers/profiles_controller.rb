class ProfilesController < ApplicationController
	before_action :should_login, only: [:index, :update, :destroy]
	before_action :set_profile, only: [:show, :update, :destroy, :library]
	before_action :correct_profile, only: [:update, :destroy]

	def index
		@title = 'Profiles'
		@profiles = Profile.all
	end

	def new
		@title = 'Sign up'
		@button_text = 'Create an account'
		if params[:token]
			auth = request.env['omniauth.auth']['info']
			@profile = Profile.find_by(lastfm_id: auth['nickname'])
			if @profile
				redirect_to login_path
				flash[:warning] = "Looks like you've already signed in via your Last.fm account."
			else
				@profile = Profile.new(nickname: auth['nickname'], 
									   name: auth['name'], 
									   country: auth['country'], 
									   gender: auth['gender'], 
									   remote_avatar_url: auth['image'], 
									   lastfm_id: auth['nickname'])
			end
		else
			@profile = Profile.new
		end
	end

	def create
		@profile = Profile.new(primary_params)
		if @profile.valid?
			@profile = Profile.create(profile_params)
			if @profile.save
				log_out
				log_in @profile
				remember @profile
				redirect_to root_path
				if @profile.lastfm_id.present?
					GetTracksJob.perform_later(@profile)
				end
			else
				respond_to :js
			end
		else
			respond_to :js
		end
	end

	def show
		@title = "#{@profile.nickname}'s profile"
	end

	def update
		@profile.update(profile_params)
		if @profile.save
			respond_to :js
			flash[:success] = 'Profile was updated.'
		else
			respond_to :js
		end
	end

	def destroy
		@profile.destroy
		redirect_to root_path
	end

	def library
		# GetTracksJob.perform_later(@profile)
		@title = "#{@profile.nickname}'s library"
		@top_artists = @profile.profile_artists.order(count: :desc).first(8)
		@top_albums = @profile.profile_albums.order(count: :desc).first(8)
		@top_tracks = @profile.profile_tracks.order(count: :desc).first(12)
		@plays = @profile.plays.order(created_at: :desc).first(10)
		@new_tracks = @profile.profile_tracks.order(created_at: :desc).first(5)
	end

	private

		def primary_params
			params.require(:profile).permit(:lastfm_id, :nickname, :email, :password, :password_confirmation)
		end

		def profile_params
			params.require(:profile).permit(:lastfm_id, :nickname, :name, :country, :city, :birthdate, :gender, :avatar, :remote_avatar_url, :email, :password, :password_confirmation)
		end

		def correct_profile
			unless current_profile?(Profile.find_by(id: params[:id]))
				redirect_to root_path
			end
		end

		def set_profile
			@profile = Profile.find_by(id: params[:id])
		end

		def correct_profile
			unless current_profile?(@profile = Profile.find_by(id: params[:id]))
				redirect_to root_path
			end
		end
end
