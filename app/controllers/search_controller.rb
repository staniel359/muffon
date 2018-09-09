class SearchController < ApplicationController
  before_action :set_title

  def index
    set_search_data
    set_current_artist_ids
    set_profile_instances
    respond_with_js_and_html
  end

  def sidebar_search
    set_sidebar_search_data
    respond_with_js
  end

private

  def set_title
    @title = t("search.#{params[:action]}")
  end

  def set_search_data
    @artists = search_data[:artists]
    @albums  = search_data[:albums]
    @tracks  = search_data[:tracks]
  end

  def search_data
    @search_data ||= Muffon::Processor::Search.call(
      params.slice(:q)
    )
  end

  def set_current_artist_ids
    @current_artist_ids = @artists&.pluck(:id)
  end

  def set_sidebar_search_data
    set_raw_artists
    set_raw_albums
    set_raw_tracks
  end

  def set_raw_artists
    @artists =
      LastFM::Search.call(params.slice(:q))[:artists].first(3)
  end

  def set_raw_albums
    @albums =
      LastFM::Search.call(params.slice(:q))[:albums].first(3)
  end

  def set_raw_tracks
    @tracks =
      LastFM::Search.call(params.slice(:q))[:tracks].first(6)
  end
end
