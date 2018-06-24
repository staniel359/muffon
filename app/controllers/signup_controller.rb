class SignupController < ProfilesController
  def new
    should_logout
    @page_data = {
      title:   title,
      profile: profile
    }
  end

  def create
    should_logout
    @page_data = {
      profile: profile
    }
    return process_profile if profile.update(primary_params)
    respond_with_js
  end

private

  def title
    t("signup.#{params[:action]}")
  end

  def profile
    @profile ||= set_profile
  end

  def set_profile
    if params[:oauth_data].present?
      set_lastfm_profile
    else
      Profile.new
    end
  end

  def set_lastfm_profile
    if lastfm_profile.present?
      redirect_to login_path
      flash[:warning] = t('signup.lastfm_signed_up')
    else
      Profile.new(lastfm_params)
    end
  end

  def lastfm_profile
    Profile.find_by(lastfm_id: lastfm_data[:nickname])
  end

  def lastfm_data
    @lastfm_data ||= params[:oauth_data].as_json.symbolize_keys
  end

  def lastfm_params
    lastfm_data.slice(
      :nickname, :name, :country, :gender
    ).merge(
      lastfm_id:         lastfm_data[:nickname],
      remote_avatar_url: lastfm_data[:image]
    )
  end

  def process_profile
    profile.update(profile_params)
    log_in(profile.id)
    remember_profile
    redirect_to welcome_path
  end
end
