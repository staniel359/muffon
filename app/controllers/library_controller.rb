class LibraryController < ApplicationController
  before_action :set_profile
  before_action :set_artists, only: %i[show artists_scope]
  before_action :set_albums, only: %i[show albums_scope]
  before_action :set_tracks, only: %i[show tracks_scope]

  def show
    @title = "#{@profile.nickname}'s library"
    @loved_tracks = set_loved_tracks.first(4)
    @new_tracks = @profile.profile_tracks.includes(
      :track, :artist
    ).reorder(created_at: :desc).first(5)
    @plays = set_plays.first(12)
    @tags = @profile.profile_tags.includes(:tag).first(20)
  end

  def artists_scope
    if params[:default]
      @profile.update(
        top_artists_scope: params[:scope].to_i
      )
    end

    respond_to { |format| format.js { render layout: false } }
  end

  def albums_scope
    if params[:default]
      @profile.update(
        top_albums_scope: params[:scope].to_i
      )
    end

    respond_to { |format| format.js { render layout: false } }
  end

  def tracks_scope
    if params[:default]
      @profile.update(
        top_tracks_scope: params[:scope].to_i
      )
    end

    respond_to { |format| format.js { render layout: false } }
  end

  def artists
    @title = "#{@profile.nickname}'s artists"
    @artists = ordered_model('artist').includes(:artist)

    respond_to do |format|
      format.html
      format.js { render layout: false }
    end
  end

  def albums
    @title = "#{@profile.nickname}'s albums"
    @albums = ordered_model('album').includes(:album, :artist)

    respond_to do |format|
      format.html
      format.js { render layout: false }
    end
  end

  def tracks
    @title = "#{@profile.nickname}'s tracks"
    @tracks = ordered_model('track').includes(:track, :artist)
    @loved_tracks = set_loved_tracks.page(params[:page]).per(20)

    respond_to do |format|
      format.html
      format.js { render layout: false }
    end
  end

  def plays
    @title = "#{@profile.nickname}'s plays"
    @plays = set_plays.page(params[:page]).per(20)
  end

private

  def set_profile
    @profile ||= Profile.find_by(id: params[:id])
  end

  def set_artists
    @artists = scope_model('artist').includes(:artist).first(8)
  end

  def scope_model(model_name)
    Library::Scope.call(
      profile_id: @profile.id,
      model_name: model_name,
      days: params[:scope]
    )
  end

  def set_albums
    @albums = scope_model('album').includes(:album, :artist).first(4)
  end

  def set_tracks
    @tracks = scope_model('track').includes(:track, :artist).first(8)
  end

  def set_loved_tracks
    @profile.loved_tracks.includes(:track, :artist)
  end

  def set_plays
    @profile.plays.includes(:profile_track, :track, :artist, :album)
  end

  def ordered_model(model_name)
    Library::Order.call(
      profile_id: @profile.id,
      model_name: model_name,
      order: params[:order]
    ).page(params[:page]).per(20)
  end
end
