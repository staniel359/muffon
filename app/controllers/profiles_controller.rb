class ProfilesController < ApplicationController
  before_action :should_login, only: [:index, :update, :destroy]
  before_action :set_profile, only: [:show, :update, :destroy]
  before_action :correct_profile, only: [:update, :destroy]

  def index
    @title = 'Profiles'
    @profiles = Profile.all
    @profile = current_profile
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
        @profile = Profile.new(nickname: auth['nickname'], name: auth['name'], country: auth['country'], gender: auth['gender'], remote_avatar_url: auth['image'], lastfm_id: auth['nickname'])
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
        GetTracksJob.perform_later(@profile.id) if @profile.lastfm_id.present?
      else
        respond_to :js
      end
    else
      respond_to :js
    end
  end

  def show
    @title = "#{@profile.nickname}'s profile"
    if logged_in? && !current_profile?(@profile)
      get_common_artists
    end
  end

  def update
    @profile.update(profile_params)
    flash.now[:success] = 'Profile was updated.' if @profile.save
    respond_to :js
  end

  def destroy
    @profile.destroy
    redirect_to root_path
  end

  private

    def primary_params
      params.require(:profile).permit(:lastfm_id, :nickname, :email, :password, :password_confirmation)
    end

    def profile_params
      params.require(:profile).permit(:lastfm_id, :nickname, :name, :country, :city, :birthdate, :gender, :avatar, :remote_avatar_url, :email, :password, :password_confirmation, :library_artists_scope, :top_artists_scope)
    end

    def set_profile
      @profile = Profile.find(params[:id])
    end

    def correct_profile
      unless current_profile?(Profile.find(params[:id]))
        redirect_to root_path
      end
    end
end
