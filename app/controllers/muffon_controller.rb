class MuffonController < ApplicationController
  def root
    redirect_to dashboard_path if logged_in?
  end

  def welcome; end

  def dashboard
    @page_data = {
      title: title
    }
  end

  def notifications
    should_login
    @page_data = {
      title: title
    }
  end

  def feed
    should_login
    @page_data = {
      title: title
    }
  end

  def player
    should_login
    @page_data = {
      title: title
    }
  end

  def about
    @page_data = {
      title: title
    }
  end

  def help
    @page_data = {
      title: title
    }
  end

  def contribute
    @page_data = {
      title: title
    }
  end

  def contact
    @page_data = {
      title: title
    }
  end

private

  def title
    t("muffon.#{params[:action]}")
  end
end
