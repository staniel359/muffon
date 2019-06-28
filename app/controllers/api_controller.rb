class ApiController < ApplicationController
  def index
    title
  end

private

  def title
    @title = t("api.#{params[:action]}")
  end
end
