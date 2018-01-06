class LabelsController < ApplicationController
  def show
    @title = "Labels - #{params[:name]}"
  end
end
