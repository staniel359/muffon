module ApplicationHelper
  include Pagy::Frontend

  def start_page?
    params[:action] == 'start' && !logged_in?
  end

  def page_title
    current_page?(root_url) ? 'muffon' : "#{@title} | muffon"
  end
end
