module SessionsHelper
  def should_be_logged_out
    redirect_to root_path if logged_in?
  end

  def logged_in?
    current_profile.present?
  end

  def current_profile
    profile_id = session[:profile_id] || cookies.signed[:profile_id]
    @current_profile ||= Profile.find_by(id: profile_id)
  end

  def log_in(profile_id)
    session[:profile_id] = profile_id
  end

  def remember(profile_id)
    cookies.permanent.signed[:profile_id] = profile_id
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

  def current_profile?(profile)
    profile == current_profile
  end

  def log_out
    session[:profile_id] = nil
    cookies.signed[:profile_id] = nil
  end
end
