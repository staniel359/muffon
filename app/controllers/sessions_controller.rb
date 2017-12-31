class SessionsController < ApplicationController
  before_action :set_profile, only: :create
  before_action :should_be_logged_out, only: %i[new create]

  def new
    @title = 'Log in'
  end

  def create
    profile_can_log_in? ? accept_log_in : deny_log_in
  end

  def destroy
    log_out
    redirect_to root_path
  end

private

  def set_profile
    @profile = Profile.find_by_email(params[:session][:email])
  end

  def profile_can_log_in?
    @profile.present? && @profile.authenticate(params[:session][:password])
  end

  def accept_log_in
    log_in(@profile.id)
    remember(@profile.id) if params[:session][:remember_me] == '1'
    redirect_back_or root_path
  end

  def redirect_back_or(default)
    redirect_to(session[:forwarding_url] || default)
    session.delete(:forwarding_url)
  end

  def deny_log_in
    flash[:danger] = 'Invalid email or password.'
    respond_to do |format|
      format.js { render layout: false }
    end
  end
end
