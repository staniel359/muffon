class SettingsController < ApplicationController
  def index
    should_login
    set_title
  end

private

  def set_title
    @title = t("settings.#{params[:action]}")
  end
end
