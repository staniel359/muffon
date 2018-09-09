class FeedController < ApplicationController
  def index
    set_title
  end

private

  def set_title
    @title = t("feed.#{params[:action]}")
  end
end
