class MuffonController < ApplicationController
  before_action :set_title

  def start
    redirect_to dashboard_path if logged_in?
  end

  def welcome; end

  def dashboard; end

  def notifications
    should_login
  end

  def feed
    should_login
  end

  def player
    should_login
  end

  def about; end

  def help; end

  def contribute; end

  def contact; end

private

  def set_title
    @title = t("muffon.#{params[:action]}")
  end
end
