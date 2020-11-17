class RecommendationsController < ApplicationController
  before_action :should_login, :set_title

  def index
    set_query_params
    set_recommendations
    set_artist if params[:artist_name].present?
    set_current_artist_ids
    update_artists
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

  def set_query_params
    @query_params = params.as_json.slice(
      'artist_name', 'tag_name', 'days',
      'exclude_tag_names', 'recommendation'
    )
  end

  def set_recommendations
    @recommendations = paginate(filtered_recommendations, 20)
  end

  def filtered_recommendations
    Recommendations::Filter.call(filter_params)
  end

  def filter_params
    params.slice(
      :artist_name, :tag_name, :days,
      :exclude_tag_names, :recommendation, :random
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

  def update_artists
    Muffon::Processor::Recommendations::Artists.call(
      artist_names: artist_names
    )
  end

  def artist_names
    Artist.where(
      id: @current_artist_ids, tag_ids: []
    ).pluck(:name)
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
