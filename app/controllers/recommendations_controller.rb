class RecommendationsController < ApplicationController
  before_action :should_login, :set_title

  def index
    set_query_params
    set_recommendations
    set_artist if params[:artist_name].present?
    set_current_artist_ids
    set_profile_instances
    respond_with_js_and_html
  end

  def destroy
    delete_recommendation
    respond_with_js
  end

  def restore
    restore_recommendation
    respond_with_js
  end

private

  def set_title
    @title = t("recommendations.#{params[:action]}")
  end

  def set_recommendations
    @recommendations = paginate(filtered_recommendations, 10)
  end

  def filtered_recommendations
    Recommendations::Filter.call(filter_params)
  end

  def filter_params
    params.slice(
      :artist_name, :tag_name, :days
    ).merge!(profile_id: current_profile.id)
  end

  def set_artist
    @artist = current_profile.profile_artists.joins(
      'JOIN "artists" ON "artists"."id" = "profile_artists"."artist_id"'
    ).find_by(
      'LOWER(artists.name) = ?', params[:artist_name].downcase
    )&.decorate
  end

  def set_current_artist_ids
    @current_artist_ids = @recommendations.pluck(:artist_id)
  end

  def set_query_params
    @query_params = params.as_json.slice(
      'artist_name', 'tag_name', 'days'
    )
  end

  def delete_recommendation
    recommendation&.update(deleted: true)
  end

  def recommendation
    current_profile.recommendations.find_by(
      id: params[:recommendation_id]
    )
  end

  def restore_recommendation
    recommendation&.update(deleted: false)
  end
end
