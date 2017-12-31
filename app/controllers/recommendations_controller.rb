class RecommendationsController < ApplicationController
  before_action :should_login

  def index
    @title = 'Recommendations'
    @recommendations = Recommendations::Filter.call(
      params: params, profile_id: current_profile.id
    ).page(params[:page]).per(10)

    respond_to do |format|
      format.html
      format.js { render layout: false }
    end
  end

  def delete
    current_profile.recommendations.find_by(
      artist_id: params[:artist_id]
    ).update(deleted: 1)

    respond_to do |format|
      format.js { render layout: false }
    end
  end

  def restore
    current_profile.recommendations.find_by(
      artist_id: params[:artist_id]
    ).update(deleted: nil)

    respond_to do |format|
      format.js { render layout: false }
    end
  end
end
