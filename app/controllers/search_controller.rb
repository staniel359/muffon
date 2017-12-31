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

  def artist
    @title = 'Search for artist'
    @artists = params[:q].present? ? search_for('artist', 20) : []

    respond_to do |format|
      format.html
      format.js { render layout: false }
    end
  end

  def album
    @title = 'Search for album'
    @albums = params[:q].present? ? search_for('album', 20) : []

    respond_to do |format|
      format.html
      format.js { render layout: false }
    end
  end

  def track
    @title = 'Search for track'
    @tracks = params[:q].present? ? search_for('track', 50) : []

    respond_to do |format|
      format.html
      format.js { render layout: false }
    end
  end

private

  def search_on_lastfm
    @artists = search_for('artist', 4)
    @albums = search_for('album', 4)
    @tracks = search_for('track', 10)
  end

  def search_for(model, limit)
    JSON.parse(
      RestClient.get(
        'http://ws.audioscrobbler.com/2.0/'\
        "?method=#{model}.search&#{model}=#{CGI.escape(params[:q])}"\
        "&limit=#{limit}&api_key=#{ENV['LASTFM_KEY']}&format=json"
      )
    )['results']["#{model}matches"][model.to_s].sort_by do |m|
      m['listeners'].to_i
    end.reverse
  end
end
