module Connections
  class LastFMController < ApplicationController
    def new
      return process_profile if current_profile.present?

      redirect_to registration_path(lastfm_data: lastfm_data)
    end

    def import
      LastFMDataImportWorker.perform_async(current_profile.id)
      redirect_to dashboard_path
    end

  private

    def set_title; end

    def process_profile
      current_profile.update(lastfm_attributes)
      redirect_to settings_path
    end

    def lastfm_attributes
      lastfm_data.slice(
        :nickname, :name, :country, :gender
      ).merge(
        lastfm_id:         lastfm_data[:nickname],
        remote_avatar_url: lastfm_data[:image]
      )
    end

    def lastfm_data
      @lastfm_data ||=
        request.env['omniauth.auth']['info'].symbolize_keys
    end
  end
end
