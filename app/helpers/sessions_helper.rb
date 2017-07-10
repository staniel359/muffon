module SessionsHelper
  def log_in(profile)
    session[:profile_id] = profile.id
  end

  def remember(profile)
    cookies.permanent.signed[:profile_id] = profile.id
  end

  def current_profile
    Profile.find_by(id: session[:profile_id]) || Profile.find_by(id: cookies.signed[:profile_id])
  end

  def current_profile?(profile)
    profile == current_profile
  end

  def logged_in?
    current_profile.present?
  end

  def log_out
    session[:profile_id] = nil
    cookies.signed[:profile_id] = nil
  end

  def should_login
    return if logged_in?
    store_location
    redirect_to login_path
    flash[:warning] = 'Please log in to access this page.'
  end

  def store_location
    session[:forwarding_url] = request.original_url if request.get?
  end

  def redirect_back_or(default)
    redirect_to(session[:forwarding_url] || default)
    session.delete(:forwarding_url)
  end
end
