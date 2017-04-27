class ProfilesController < ApplicationController
	before_action :should_login, only: [:index, :update, :destroy]
	before_action :set_profile, only: [:show, :update, :destroy]
	before_action :correct_profile, only: [:update, :destroy]

	def index
		@title = 'Profiles'
		@profiles = Profile.all
	end

	def new
		@title = 'Sign up'
		@profile = Profile.new
	end

	def create
		@profile = Profile.create(profile_params)
		if @profile.save
			log_out
			log_in @profile
			redirect_to @profile
		else
			render 'new'
		end
	end

	def show
		@profile = Profile.find_by(id: params[:id])
		@title = "#{@profile.nickname}'s profile"
	end

	def update
		@profile = Profile.find_by(id: params[:id])
		@profile.update(profile_params)
		if @profile.save
			redirect_to settings_path
			flash[:success] = 'Profile was updated.'
		else
			redirect_to settings_path
			flash[:danger] = 'Something went wrong.'
		end
	end

	def destroy
		@profile.destroy
		redirect_to root_path
	end
		

	private

		def profile_params
			params.require(:profile).permit(:nickname, :email, :password, :password_confirmation)
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
