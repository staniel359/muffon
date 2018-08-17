class ProfilesController < ApplicationController
  before_action :set_profile, except: :index
  before_action :set_title

  def index
    should_login
    @pagy, @profiles = pagy(Profile.all)
  end

  def show
    @plays = plays
    @artists = artists
    @albums = albums
    @tracks = tracks
    @compatibility = compatibility
    @playing_now_track = playing_now_track
  end

  def update
    should_login
    current_profile.update(profile_params)
    flash.now[:success] = t('profiles.updated')
    respond_with_js
  end

  def destroy
    should_login
    current_profile.destroy
    redirect_to root_path
  end

private

  def set_title
    @title = t(
      "profiles.#{params[:action]}",
      profile: @profile&.nickname
    )
  end

  def plays
    @profile.plays.created_desc.limit(10).decorate
  end

  def artists
    @profile.profile_artists.plays_count_desc.limit(8).decorate
  end

  def albums
    @profile.profile_albums.plays_count_desc.limit(8).decorate
  end

  def tracks
    @profile.profile_tracks.plays_count_desc.limit(10).decorate
  end

  def compatibility
    return unless other_profile?(@profile)

    Muffon::Compatibility.call(
      current_profile_id: current_profile.id,
      other_profile_id:   @profile.id
    )
  end

  def playing_now_track
    Track.find_by(id: Player::PlayingNow.get(@profile.id))
  end

  def primary_params
    params.require(:profile).permit(primary_params_list)
  end

  def primary_params_list
    %i[email password password_confirmation lastfm_id nickname]
  end

  def profile_params
    params.require(:profile).permit(
      primary_params_list + profile_params_list
    )
  end

  def profile_params_list
    %i[avatar remote_avatar_url name gender country city birthdate]
  end
end
