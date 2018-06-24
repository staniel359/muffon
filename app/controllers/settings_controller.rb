class SettingsController < ApplicationController
  def index
    @page_data = {
      title: title
    }
  end

private

  def title
    t("settings.#{params[:action]}")
  end
end
