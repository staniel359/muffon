module Connections
  class LastFMController < ApplicationController
    def new
      return process_profile if current_profile.present?

      redirect_to registrations_path(lastfm_data: lastfm_data)
    end

    def disconnect
      current_profile.update(lastfm_id: nil)
      flash[:success] = t('connections.lastfm.disconnect')
      respond_with_js
    end

    def update
      current_profile.update!(profile_params)
      flash[:success] = t('profiles.updated')
      respond_with_js
    end

    def import
      LastFMDataImportWorker.perform_async(current_profile.id)
      respond_to do |format|
        format.js { render layout: false }
        format.html { redirect_to dashboard_path }
      end
    end

  private

    def process_profile
      if connected_profile.present?
        redirect_connected_profile
      else
        connect_profile_and_redirect
      end
    end

    def connected_profile
      Profile.find_by(lastfm_id: lastfm_data[:nickname])
    end

    def lastfm_data
      @lastfm_data ||=
        request.env['omniauth.auth']['info'].symbolize_keys
    end

    def redirect_connected_profile
      redirect_to '/settings#lastfm-connect'
      flash[:warning] = t('registrations.lastfm.fail')
    end

    def connect_profile_and_redirect
      current_profile.update(lastfm_id: lastfm_data[:nickname])
      redirect_to "/settings?#{lastfm_data_query}#lastfm-connect"
      flash[:success] = t('connections.lastfm.success')
    end

    def lastfm_data_query
      { lastfm_data: lastfm_params }.to_query
    end

    def lastfm_params
      lastfm_data.slice(:nickname, :name, :country).merge(
        remote_avatar_url: lastfm_data[:image]
      )
    end

    def profile_params
      params.require(:profile).permit(
        :nickname, :name, :country, :remote_avatar_url
      )
    end
  end
end
