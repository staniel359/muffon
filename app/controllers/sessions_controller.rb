class SessionsController < ApplicationController
  def new
    should_logout
    respond_with_js_and_html
  end

  def create
    should_logout
    profile_can_log_in? ? accept_log_in : deny_log_in
  end

  def destroy
    log_out
    redirect_to root_path
  end

private

  def profile_can_log_in?
    profile&.authenticate(params[:session][:password])
  end

  def profile
    @profile ||= Profile.find_by(email: params[:session][:email])
  end

  def accept_log_in
    log_in(profile.id)
    remember_profile if params[:session][:remember_me] == '1'
    redirect_to(session[:forwarding_url] || root_path)
    session.delete(:forwarding_url)
  end

  def deny_log_in
    flash.now[:danger] = t('sessions.login_failed')
    respond_with_js
  end
end
