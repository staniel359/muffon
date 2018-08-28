class FeedController < ApplicationController
  before_action :set_title

  def index; end

private

  def set_title
    @title = t("feed.#{params[:action]}")
  end
end
