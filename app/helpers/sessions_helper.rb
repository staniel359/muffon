module SessionsHelper
  def should_logout
    redirect_to root_path if logged_in?
  end

  def logged_in?
    current_profile.present?
  end

  def current_profile
    return unless profile_id.present?

    @current_profile ||= Profile.find_by(id: profile_id)&.decorate
  end

  def profile_id
    return cookies.signed[:profile_id] if cookies.signed[:remember]

    session[:profile_id]
  end

  def other_profile?(profile)
    logged_in? && !current_profile?(profile)
  end

  def log_in(profile_id)
    session[:profile_id] = profile_id
    cookies.permanent.signed[:profile_id] = profile_id
  end

  def remember_profile
    cookies.permanent.signed[:remember] = true
  end

  def should_login
    return if logged_in?

    store_location
    redirect_to login_path
    flash[:warning] = t('sessions.should_login')
  end

  def store_location
    return unless request.get?

    session[:forwarding_url] = request.original_url
  end

  def current_profile?(profile)
    profile == current_profile
  end

  def log_out
    session[:profile_id] = nil
    cookies.signed[:profile_id] = nil
    cookies.signed[:remember] = nil
  end
end
