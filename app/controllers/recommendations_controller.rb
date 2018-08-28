class RecommendationsController < ApplicationController
  before_action :should_login, :set_title
  before_action :set_query_params, :set_recommendations, :process_artists,
                :set_artist, :set_profile_instances, only: :index

  def index
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

  def process_artists
    Muffon::Processor::Recommendations::Artists.call(
      artists: @recommendations.decorate.map(&:artist_name)
    )
  end

  def set_artist
    return unless params[:artist_name].present?

    @artist = current_profile.profile_artists.joins(
      'JOIN "artists" ON "artists"."id" = "profile_artists"."artist_id"'
    ).find_by(
      'LOWER(artists.name) = ?', params[:artist_name].downcase
    )&.decorate
  end

  def set_profile_instances
    set_profile_artist_ids
    set_bookmarked_artist_ids
    set_listened_artist_ids
  end

  def set_profile_artist_ids
    @profile_artist_ids = current_profile.profile_artists.where(
      artist_id: @recommendations.pluck(:artist_id)
    ).pluck(:artist_id)
  end

  def set_bookmarked_artist_ids
    @bookmarked_artist_ids = current_profile.bookmarks.where(
      bookmarkable_type: 'Artist',
      bookmarkable_id:   @recommendations.pluck(:artist_id)
    ).pluck(:bookmarkable_id)
  end

  def set_listened_artist_ids
    @listened_artist_ids = current_profile.listened_artists.where(
      artist_id: @recommendations.pluck(:artist_id)
    ).pluck(:artist_id)
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
