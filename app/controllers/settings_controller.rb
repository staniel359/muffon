class SettingsController < ApplicationController
  def index
    should_login
  end

private

  def set_title
    @title = t("settings.#{params[:action]}")
  end
end
