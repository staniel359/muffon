class FeedController < ApplicationController
  def index
    @page_data = {
      title: title
    }
  end

private

  def title
    t("feed.#{params[:action]}")
  end
end
