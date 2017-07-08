class LibraryController < ApplicationController
  before_action :set_profile
  before_action :set_artist, only: [:artist, :artist_tracks, :artist_albums, :artist_plays]
  before_action :set_album, only: [:album, :album_plays]
  before_action :set_track, only: :track_plays
  before_action :correct_profile, only: :library_default_scope

  def show
    @title = "#{@profile.nickname}'s library"
    get_scoped_artists(@profile.top_artists_scope)
    get_scoped_albums(@profile.top_albums_scope)
    get_scoped_tracks(@profile.top_tracks_scope)
    @plays = @profile.plays.order(created_at: :desc).first(9)
    @new_tracks = @profile.profile_tracks.order(created_at: :desc).first(4)
    @loved_tracks = @profile.profile_tracks.where(loved: 1).order(created_at: :desc).first(4)
    @top_tags = @profile.profile_tags.order(count: :desc).first(10)
  end

  def library_scope
    if params[:artists_scope]
      get_scoped_artists(params[:artists_scope].to_i)
    elsif params[:albums_scope]
      get_scoped_albums(params[:albums_scope].to_i)
    elsif params[:tracks_scope]
      get_scoped_tracks(params[:tracks_scope].to_i)
    end
    respond_to :js
  end

  def library_default_scope
    if params[:artists_default_scope]
      @profile.update!(top_artists_scope: params[:artists_default_scope].to_i)
    elsif params[:albums_default_scope]
      @profile.update!(top_albums_scope: params[:albums_default_scope].to_i)
    elsif params[:tracks_default_scope]
      @profile.update!(top_tracks_scope: params[:tracks_default_scope].to_i)
    end
    respond_to :js
  end

  def artists
    @title = "#{@profile.nickname}'s artists"
    @artists = @profile.profile_artists.joins(:plays).group('profile_artists.id').order('count(profile_artists.id) desc').paginate(page: params[:page], per_page: 20)
  end

  def artists_scope
    case params[:scope]
    when '1'
      order = 'count(profile_artists.id) desc'
    when '2'
      order = 'count(profile_artists.id) asc'
    when '3'
      order = 'created_at desc'
    when '4'
      order = 'created_at asc'
    end
    @artists = @profile.profile_artists.joins(:plays).group('profile_artists.id').order(order).paginate(page: params[:page], per_page: 20)
    respond_to :js
  end

  def artist
    @title = "#{@artist.artist.name} in #{@profile.nickname}'s library"
    @tracks = @artist.profile_tracks.joins(:plays).group('profile_tracks.id').order('count(profile_tracks.id) desc').limit(5)
    @albums = @artist.profile_albums.joins(:plays).group('profile_albums.id').order('count(profile_albums.id) desc').limit(3)
    @plays = @artist.plays.order(created_at: :desc).first(5)
  end

  def artist_tracks
    @title = "#{@artist.artist.name} tracks in #{@profile.nickname}'s library"
    @tracks = @artist.profile_tracks.joins(:plays).group('profile_tracks.id').order('count(profile_tracks.id) desc').paginate(page: params[:page], per_page: 20)
  end

  def artist_albums
    @title = "#{@artist.artist.name} plays in #{@profile.nickname}'s library"
    @albums = @artist.profile_albums.joins(:plays).group('profile_albums.id').order('count(profile_albums.id) desc').paginate(page: params[:page], per_page: 20)
  end

  def artist_plays
    @title = "#{@artist.artist.name} plays in #{@profile.nickname}'s library"
    @plays = @artist.plays.order(created_at: :desc).paginate(page: params[:page], per_page: 20)
  end

  def albums
    @title = "#{@profile.nickname}'s albums"
    @albums = @profile.profile_albums.joins(:plays).group('profile_albums.id').order('count(profile_albums.id) desc').paginate(page: params[:page], per_page: 20)
  end

  def albums_scope
    case params[:scope]
    when '1'
      order = 'count(profile_albums.id) desc'
    when '2'
      order = 'count(profile_albums.id) asc'
    when '3'
      order = 'created_at desc'
    when '4'
      order = 'created_at asc'
    end
    @albums = @profile.profile_albums.joins(:plays).group('profile_albums.id').order(order).paginate(page: params[:page], per_page: 20)
    respond_to :js
  end

  def album
    @title = "#{@album.album.artist.name} - #{@album.album.title} in #{@profile.nickname}'s library"
    @tracks = @profile.profile_tracks.where("'?' = any(profile_albums)", @album.id)
    @tracks.joins(:plays).group('profile_tracks.id').order('count(profile_tracks.id) desc')
    @plays = @album.plays.order(created_at: :desc).first(10)
  end

  def album_plays
    @title = "#{@album.album.artist.name} - #{@album.album.title} plays in #{@profile.nickname}'s library"
    @plays = @album.plays.order(created_at: :desc).paginate(page: params[:page], per_page: 20)
  end

  def tracks
    @title = "#{@profile.nickname}'s tracks"
    @tracks = @profile.profile_tracks.joins(:plays).group('profile_tracks.id').order('count(profile_tracks.id) desc').paginate(page: params[:page], per_page: 20)
  end

  def tracks_scope
    case params[:scope]
    when '1'
      order = 'count(profile_tracks.id) desc'
    when '2'
      order = 'count(profile_tracks.id) asc'
    when '3'
      order = 'created_at desc'
    when '4'
      order = 'created_at asc'
    end
    @tracks = @profile.profile_tracks.joins(:plays).group('profile_tracks.id').order(order).paginate(page: params[:page], per_page: 20)
    respond_to :js
  end

  def track_plays
    @title = "#{@track.artist.name} - #{@track.track.title} plays in #{@profile.nickname}'s library"
    @plays = @track.plays.order(created_at: :desc).paginate(page: params[:page], per_page: 20)
  end

  def plays
    @title = "#{@profile.nickname}'s plays"
    @plays = @profile.plays.order(created_at: :desc).paginate(page: params[:page], per_page: 20)
  end

  private

    def set_profile
      @profile = Profile.find(params[:id])
    end

    def set_artist
      @artist = @profile.profile_artists.find(params[:artist_id])
    end

    def set_album
      @album = @profile.profile_albums.find(params[:album_id])
    end

    def set_track
      @track = @profile.profile_tracks.find(params[:track_id])
    end

    def correct_profile
      redirect_to root_path unless current_profile?(Profile.find(params[:id]))
    end
end
