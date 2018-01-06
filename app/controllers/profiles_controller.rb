class ProfilesController < ApplicationController
  include PlayerHelper
  before_action :should_be_logged_out, only: %i[new create]
  before_action :should_login, only: %i[index update destroy]
  before_action :set_profile, only: %i[show update destroy]
  before_action :correct_profile, only: %i[update destroy]

  def index
    @title = 'Profiles'
    @profiles = Profile.all.page params[:page]
  end

  def new
    @title = 'Sign up'
    @profile = set_new_profile
  end

  def create
    return create_profile if Profile.new(primary_params).valid?
    @profile = Profile.create(primary_params)

    respond_to { |format| format.js { render layout: false } }
  end

  def show
    @title = "#{@profile.nickname}'s profile"
    @plays = @profile.plays.includes(
      :profile_track, :track, :artist, :album
    ).first(8)
    @artists = @profile.profile_artists.includes(:artist).first(8)
    @albums = @profile.profile_albums.includes(:album, :artist).first(8)
    @tracks = @profile.profile_tracks.includes(:track, :artist).first(8)

    if logged_in? && !current_profile?(@profile)
      set_common_artists
      set_common_albums
      set_common_tracks
      set_compatibility_level
    end
  end

  def update
    @profile.update(profile_params)
    flash.now[:success] = 'Profile was updated.' if @profile.save

    respond_to { |format| format.js { render layout: false } }
  end

  def destroy
    @profile.destroy
    redirect_to root_path
  end

private

  def set_new_profile
    return Profile.new unless params[:token].present?

    set_profile_from_lastfm
  end

  def set_profile_from_lastfm
    return redirect_present_profile if lastfm_profile.present?

    Profile.new(lastfm_attributes)
  end

  def lastfm_profile
    Profile.find_by(lastfm_id: lastfm_data['nickname'])
  end

  def lastfm_data
    @lastfm_data ||= request.env['omniauth.auth']['info']
  end

  def redirect_present_profile
    redirect_to login_path
    flash[:warning] = 'Looks like you\'re already signed up '\
      'via your Last.fm account.'
  end

  def lastfm_attributes
    lastfm_data.symbolize_keys.slice(
      :nickname, :name, :country, :gender
    ).merge(
      remote_avatar_url: lastfm_data['image'],
      nickname: lastfm_data['nickname'],
      lastfm_id: lastfm_data['nickname']
    )
  end

  def primary_params
    params.require(:profile).permit(
      :lastfm_id, :nickname, :email, :password, :password_confirmation
    )
  end

  def create_profile
    @profile = Profile.new(profile_params)
    return process_profile if @profile.save

    respond_to { |format| format.js { render layout: false } }
  end

  def profile_params
    params.require(:profile).permit(
      :lastfm_id, :nickname, :name, :country, :city,
      :birthdate, :gender, :avatar, :remote_avatar_url,
      :email, :password, :password_confirmation,
      :library_artists_scope, :top_artists_scope
    )
  end

  def process_profile
    log_out
    log_in(@profile.id)
    remember(@profile.id)
    redirect_to root_path

    LastfmDataImportWorker.perform_async(@profile.id) if
      @profile.lastfm_id.present?
  end

  def set_profile
    @profile = Profile.find_by(id: params[:id])
  end

  def correct_profile
    redirect_to root_path unless current_profile?(@profile)
  end

  def set_common_artists
    other_profile_artists = @profile.profile_artists.where(
      artist_id: current_profile.artist_ids & @profile.artist_ids
    )
    current_profile_artists = current_profile.profile_artists.where(
      artist_id: current_profile.artist_ids & @profile.artist_ids
    )
    @common_artists = other_profile_artists.sort_by do |o|
      my_count = current_profile_artists.find do |c|
        o.artist_id == c.artist_id
      end.playcount
      min_count = [o.playcount, my_count].min.to_f
      max_count = [o.playcount, my_count].max
      (min_count / max_count) * (o.playcount + my_count)
    end.reverse
  end

  def set_common_albums
    other_profile_albums = @profile.profile_albums.where(
      album_id: current_profile.album_ids & @profile.album_ids
    )
    current_profile_albums = current_profile.profile_albums.where(
      album_id: current_profile.album_ids & @profile.album_ids
    )
    @common_albums = other_profile_albums.sort_by do |o|
      my_count = current_profile_albums.find do |c|
        o.album_id == c.album_id
      end.playcount
      min_count = [o.playcount, my_count].min.to_f
      max_count = [o.playcount, my_count].max
      (min_count / max_count) * (o.playcount + my_count)
    end.reverse
  end

  def set_common_tracks
    other_profile_tracks = @profile.profile_tracks.where(
      track_id: current_profile.track_ids & @profile.track_ids
    )
    current_profile_tracks = current_profile.profile_tracks.where(
      track_id: current_profile.track_ids & @profile.track_ids
    )
    @common_tracks = other_profile_tracks.sort_by do |o|
      my_count = current_profile_tracks.find do |c|
        o.track_id == c.track_id
      end.playcount
      min_count = [o.playcount, my_count].min.to_f
      max_count = [o.playcount, my_count].max
      (min_count / max_count) * (o.playcount + my_count)
    end.reverse
  end

  def set_compatibility_level
    artists_percentage = (@common_artists.count.to_f / ((@profile.profile_artists.count + current_profile.profile_artists.count) / 2)) * 100
    albums_percentage = (@common_albums.count.to_f / ((@profile.profile_albums.count + current_profile.profile_albums.count) / 2)) * 100
    tracks_percentage = (@common_tracks.count.to_f / ((@profile.profile_tracks.count + current_profile.profile_tracks.count) / 2)) * 100
    @compatibility_level = (artists_percentage + albums_percentage + tracks_percentage).round
  end
end
