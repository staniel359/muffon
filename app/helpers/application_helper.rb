module ApplicationHelper
  def page_title
    current_page?(root_url) ? 'muffon' : "#{@page_data[:title]} - muffon"
  end
end
