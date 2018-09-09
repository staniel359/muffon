class RegistrationsController < ApplicationController
  before_action :set_new_profile, except: :update

  def index
    should_logout
    respond_with_js_and_html
  end

  def show
    respond_with_js
  end

  def create
    create_profile if @new_profile.update(primary_params)
    respond_with_js
  end

  def update
    if current_profile.update(profile_params)
      redirect_to dashboard_path
    else
      respond_with_js
    end
  end

private

  def set_new_profile
    @new_profile =
      params[:lastfm_data].present? ? set_lastfm_profile : Profile.new
  end

  def set_lastfm_profile
    if lastfm_profile.present?
      redirect_to login_path
      flash[:warning] = t('registrations.lastfm.fail')
    else
      Profile.new(lastfm_params)
    end
  end

  def lastfm_profile
    Profile.find_by(lastfm_id: lastfm_data[:nickname])
  end

  def lastfm_data
    @lastfm_data ||= params[:lastfm_data].as_json.symbolize_keys
  end

  def lastfm_params
    lastfm_data.slice(:nickname, :name, :country).merge(
      lastfm_id:         lastfm_data[:nickname],
      remote_avatar_url: lastfm_data[:image]
    )
  end

  def create_profile
    @new_profile.update(profile_params)
    log_in(@new_profile.id)
    remember_profile
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
end
