class LibraryArtistsController < ApplicationController
  before_action :set_profile
  before_action :set_artist
  before_action :set_tracks, only: %i[show tracks]
  before_action :set_albums, only: %i[show albums]
  before_action :set_plays, only: %i[show plays]
  before_action :set_album, :set_album_plays, only: %i[album album_plays]
  before_action :set_album_tracks, only: %i[album album_tracks]
  before_action :set_track, :set_track_plays, only: %i[track track_plays]
  before_action :set_track_albums, only: %i[track track_albums]

  def show
    @title = "#{@artist.artist.name} in #{@profile.nickname}'s library"
  end

  def create
    @artist = Artist.find(params[:artist_id])
    @profile_artist = @artist.profile_artists.create(
      profile_id: params[:id]
    )
    RecommendationArtistProcessorWorker.perform_async(
      @profile_artist.id, @profile.id, 'no_broadcast'
    )

    respond_to { |format| format.js { render layout: false } }
  end

  def tracks
    @title = "#{@artist.artist.name} tracks "\
      "in #{@profile.nickname}'s library"
  end

  def track
    @title = "#{@track.artist.name} - "\
      "#{@track.track.title} in #{@profile.nickname}'s library"
  end

  def track_plays
    @title = "#{@track.artist.name} - "\
      "#{@track.track.title} plays in #{@profile.nickname}'s library"
  end

  def albums
    @title = "#{@artist.artist.name} albums "\
      "in #{@profile.nickname}'s library"
  end

  def album
    @title = "#{@album.artist.name} - "\
      "#{@album.album.title} in #{@profile.nickname}'s library"
  end

  def album_plays
    @title = "#{@album.artist.name} - "\
      "#{@album.album.title} plays in #{@profile.nickname}'s library"
  end

  def plays
    @title = "#{@artist.artist.name} plays "\
      "in #{@profile.nickname}'s library"
  end

private

  def set_profile
    @profile = Profile.find_by_id(params[:id])
  end

  def set_artist
    @artist = @profile.profile_artists.joins(:artist).find_by(
      'artists.name = ?', params[:name]
    )
  end

  def set_tracks
    @tracks = @artist.profile_tracks.includes(
      :track, :artist
    ).page(params[:page]).per(20)
  end

  def set_albums
    @albums = @artist.profile_albums.includes(
      :album, :artist
    ).page(params[:page]).per(20)
  end

  def set_plays
    @plays = @artist.plays.includes(
      :profile_track, :track, :artist, :album
    ).page(params[:page]).per(20)
  end

  def set_album
    @album = @profile.profile_albums.joins(
      :album, :artist
    ).find_by(
      'albums.title = ? and artists.name = ?',
        CGI.unescape(params[:title]),
        CGI.unescape(params[:name])
    )
  end

  def set_album_tracks
    @tracks = @album.tracks.includes(
      :track, :artist
    ).page(params[:page]).per(20)
  end

  def set_album_plays
    @plays = @album.plays.includes(
      :profile_track, :track, :album
    ).page(params[:page]).per(20)
  end

  def set_track
    @track = @profile.profile_tracks.joins(
      :track, :artist
    ).includes(:plays).find_by(
      'tracks.title = ? and artists.name = ?',
        CGI.unescape(params[:title]),
        CGI.unescape(params[:name])
    )
  end

  def set_track_plays
    @plays = @track.plays.includes(
      :track, :artist, :album
    ).page(params[:page]).per(20)
  end

  def set_track_albums
    @albums = @profile.profile_albums.where(
      id: @track.profile_albums
    ).includes(:artist, :album)
  end
end
