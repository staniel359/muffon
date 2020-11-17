class NotificationsController < ApplicationController
  def index
    set_title
  end

private

  def set_title
    @title = t("notifications.#{params[:action]}")
  end
end
