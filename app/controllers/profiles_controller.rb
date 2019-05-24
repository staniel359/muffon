class ProfilesController < ApplicationController
  before_action :set_profile, except: :index
  before_action :should_login, except: :show
  before_action :set_title

  def index
    set_profiles
  end

  def show
    set_plays
    set_artists
    set_albums
    set_tracks
    set_common_data if other_profile?(@profile)
    set_playing_now_track
  end

  def update
    current_profile.update(profile_params)
    flash.now[:success] = t('profiles.updated')
    respond_with_js
  end

  def destroy
    if nicknames_match?
      current_profile.destroy
      redirect_to root_path
    else
      flash.now[:danger] = t('profiles.destroy.wrong_nickname')
      respond_with_js
    end
  end

private

  def set_title
    @title = t(
      "profiles.#{params[:action]}",
      profile: @profile&.nickname
    )
  end

  def set_profiles
    @profiles = paginate(Profile.created_asc, 20)
  end

  def set_plays
    @plays = @profile.plays.includes(
      :artist, [track: :artist], :profile_track,
      :profile_album, :album
    ).created_desc.limit(10).decorate
  end

  def set_artists
    @artists = @profile.profile_artists.includes(
      :artist
    ).plays_count_desc.limit(6).decorate
  end

  def set_albums
    @albums = @profile.profile_albums.includes(
      :album, :artist
    ).plays_count_desc.limit(6).decorate
  end

  def set_tracks
    @tracks = @profile.profile_tracks.includes(
      :artist, [track: :artist]
    ).plays_count_desc.limit(10).decorate
  end

  def set_common_data
    @common_artists = compatibility[:artists]
    @common_albums = compatibility[:albums]
    @common_tracks = compatibility[:tracks]
    @compatibility_percent = compatibility[:percent]
  end

  def compatibility
    @compatibility ||= Muffon::Compatibility.call(
      current_profile_id: current_profile.id,
      other_profile_id: @profile.id
    )
  end

  def set_playing_now_track
    @playing_now_track = Track.find_by(
      id: Player::PlayingNow.get(@profile.id)
    )&.decorate
  end

  def primary_params
    params.require(:profile).permit(primary_params_list)
  end

  def primary_params_list
    %i[password password_confirmation email lastfm_id nickname]
  end

  def profile_params
    params.require(:profile).permit(
      primary_params_list + profile_params_list
    )
  end

  def profile_params_list
    %i[avatar remote_avatar_url name gender country city birthdate]
  end

  def nicknames_match?
    params[:nickname].casecmp(current_profile.nickname).zero?
  end
end
