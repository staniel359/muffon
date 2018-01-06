class SearchController < ApplicationController
  def search
    @title = 'Search'

    if params[:q].present?
      search_on_lastfm
    else
      @artists = @albums = @tracks = []
    end

    respond_to do |format|
      format.html
      format.js { render layout: false }
    end
  end

  def artists
    @title = 'Search for artist'
    @artists = params[:q].present? ? search_for('artists', 20) : []

    respond_to do |format|
      format.html
      format.js { render layout: false }
    end
  end

  def albums
    @title = 'Search for album'
    @albums = params[:q].present? ? search_for('albums', 20) : []

    respond_to do |format|
      format.html
      format.js { render layout: false }
    end
  end

  def tracks
    @title = 'Search for track'
    @tracks = params[:q].present? ? search_for('tracks', 50) : []

    respond_to do |format|
      format.html
      format.js { render layout: false }
    end
  end

private

  def search_on_lastfm
    @artists = search_for('artists', 4)
    @albums = search_for('albums', 5).first(4)
    @tracks = search_for('tracks', 10)
  end

  def search_for(model, limit)
    "Lastfm::Search::#{model.capitalize}".constantize.call(
      q: params[:q], limit: limit
    )
  end
end
