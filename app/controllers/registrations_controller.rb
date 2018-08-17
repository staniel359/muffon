class RegistrationsController < ProfilesController
  before_action :set_title

  def show
    should_logout
    @profile = new_profile
    respond_with_js_and_html
  end

  def new
    @profile = new_profile
    respond_with_js
  end

  def create
    @profile = new_profile
    create_profile if @profile.update(primary_params)
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

  def set_title
    @title = t("registrations.#{params[:action]}")
  end

  def new_profile
    if params[:lastfm_data].present?
      set_lastfm_profile
    else
      Profile.new
    end
  end

  def set_lastfm_profile
    if lastfm_profile.present?
      redirect_to login_path
      flash[:warning] = t('registrations.lastfm_signed_up')
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
    @profile.update(profile_params)
    log_in(@profile.id)
    remember_profile
  end
end
