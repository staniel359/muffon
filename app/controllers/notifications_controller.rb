class NotificationsController < ApplicationController
  def index
    @page_data = {
      title: title
    }
  end

private

  def title
    t("notifications.#{params[:action]}")
  end
end
