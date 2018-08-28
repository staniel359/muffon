class NotificationsController < ApplicationController
  before_action :set_title

  def index; end

private

  def set_title
    @title = t("notifications.#{params[:action]}")
  end
end
