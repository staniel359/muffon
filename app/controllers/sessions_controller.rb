class SessionsController < ApplicationController

	def new
		@title = 'Log in'
	end

	def create
		profile = Profile.find_by(email: params[:session][:email])
		if profile && profile.authenticate(params[:session][:password])
			log_in profile
			if params[:session][:remember_me] == '1'
				remember profile
			end
			redirect_to profile
		else
			redirect_to login_path
			flash[:danger] = 'Invalid email or password.'
		end
	end

	def destroy
		log_out
		redirect_to root_path
	end
end
