class LibraryController < ApplicationController
  before_action :set_profile

  def show
    @title = "#{@profile.nickname}'s library"
    @artists = set_artists.first(8)
    @albums = set_albums.first(4)
    @tracks = set_tracks.first(8)
    @loved_tracks = set_loved_tracks.first(5)
    @new_tracks = set_new_tracks.first(5)
    @plays = set_plays.first(12)
    @tags = set_tags.first(20)
  end

  def search
    @artists = search_model('artist')
    @albums = search_model('album')
    @tracks = search_model('track')

    respond_to { |format| format.js { render layout: false } }
  end

  def library_scope
    if params[:collection] == 'artists'
      @artists = set_artists.first(8)
    elsif params[:collection] == 'albums'
      @albums = set_albums.first(4)
    elsif params[:collection] == 'tracks'
      @tracks = set_tracks.first(8)
    end

    respond_to do |format|
      format.js { render 'library/scope/library_scope', layout: false }
    end
  end

  def library_default_scope
    if params[:collection] == 'artists'
      @profile.update(top_artists_scope: params[:scope].to_i)
    elsif params[:collection] == 'albums'
      @profile.update(top_albums_scope: params[:scope].to_i)
    elsif params[:collection] == 'tracks'
      @profile.update(top_tracks_scope: params[:scope].to_i)
    end

    respond_to do |format|
      format.js { render 'library/scope/library_default_scope', layout: false }
    end
  end

  def artists
    @title = "#{@profile.nickname}'s artists"
    @artists = set_artists

    respond_to do |format|
      format.html
      format.js { render layout: false }
    end
  end

  def albums
    @title = "#{@profile.nickname}'s albums"
    @albums = set_albums

    respond_to do |format|
      format.html
      format.js { render layout: false }
    end
  end

  def tracks
    @title = "#{@profile.nickname}'s tracks"
    @tracks = set_tracks
    @loved_tracks = set_loved_tracks

    respond_to do |format|
      format.html
      format.js { render layout: false }
    end
  end

  def plays
    @title = "#{@profile.nickname}'s plays"
    @plays = set_plays
  end

private

  def set_profile
    @profile ||= Profile.find_by(id: params[:id])
  end

  def set_artists
    process_collection('artists').includes(
      :artist
    ).page(params[:page]).per(20)
  end

  def process_collection(name)
    Library::Collection.call(
      profile_id: @profile.id,
      collection_name: name,
      order: params[:order],
      scope: params[:scope]
    )
  end

  def set_albums
    process_collection('albums').includes(
      :album, :artist
    ).page(params[:page]).per(20)
  end

  def set_tracks
    process_collection('tracks').includes(
      :track, :artist
    ).page(params[:page]).per(20)
  end

  def set_loved_tracks
    @profile.loved_tracks.includes(
      :track, :artist
    ).page(params[:page]).per(20)
  end

  def set_new_tracks
    @profile.profile_tracks.includes(
      :track, :artist
    ).reorder(created_at: :desc)
  end

  def set_plays
    @profile.plays.includes(
      :profile_track, :track, :artist, :album
    ).page(params[:page]).per(20)
  end

  def set_tags
    @profile.profile_tags.includes(:tag)
  end

  def search_model(model_name)
    "Library::Search::#{model_name.capitalize}s".constantize.call(
      profile_id: @profile.id, q: params[:q]
    )
  end
end
