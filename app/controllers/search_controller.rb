class SearchController < ApplicationController
  def index
    @page_data = {
      title:       title,
      search_data: search_data
    }
    respond_with_js_and_html
  end

  def artists
    @page_data = {
      title:   title,
      artists: retrieve_artists
    }
    respond_with_js_and_html
  end

  def albums
    @page_data = {
      title:   title,
      albums:  retrieve_albums
    }
    respond_with_js_and_html
  end

  def tracks
    @page_data = {
      title:   title,
      tracks:  retrieve_tracks
    }
    respond_with_js_and_html
  end

private

  def title
    t("search.#{params[:action]}")
  end

  def search_data
    LastFM::Search.call(params.slice(:q))
  end

  def retrieve_artists
    artists_data = search_collection('artists', 20)
    paginate(
      paginate_array(
        artists_data[:data], artists_data[:total_count]
      )
    )
  end

  def search_collection(collection, limit)
    "LastFM::Search::#{collection.capitalize}".constantize.call(
      params.slice(:q, :page).merge(limit: limit)
    )
  end

  def retrieve_albums
    albums_data = search_collection('albums', 20)
    paginate(
      paginate_array(
        albums_data[:data], albums_data[:total_count]
      )
    )
  end

  def retrieve_tracks
    tracks_data = search_collection('tracks', 20)
    paginate(
      paginate_array(
        tracks_data[:data], tracks_data[:total_count]
      )
    )
  end
end
