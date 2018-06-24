class RecommendationsController < ApplicationController
  before_action :should_login

  def index
    should_login
    @page_data = {
      title:           title,
      recommendations: recommendations
    }
  end

  def filter
    should_login
    @page_data = {
      recommendations: filtered_recommendations
    }
    respond_with_js
  end

  def delete
    should_login
    delete_recommendation
    respond_with_js
  end

  def restore
    should_login
    restore_recommendation
    respond_with_js
  end

private

  def title
    t("recommendations.#{params[:action]}")
  end

  def recommendations
    paginate(
      current_profile.recommendations.artists_count_desc, 10
    )
  end

  def filtered_recommendations
    paginate(filtered_recommendations_data, 10)
  end

  def filtered_recommendations_data
    Recommendations::Filter.call(
      params.slice(:artist_name, :tag_name, :days).merge!(
        profile_id: current_profile.id
      )
    )
  end

  def delete_recommendation
    recommendation&.update(deleted: true)
  end

  def recommendation
    current_profile.recommendations.find_by(
      artist_id: params[:artist_id]
    )
  end

  def restore_recommendation
    recommendation&.update(deleted: false)
  end
end
