module MuffonHelper
  def welcome_page?
    params[:action] == 'home' && !logged_in?
  end
end
