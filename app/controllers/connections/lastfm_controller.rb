module Connections
  class LastFMController < ApplicationController
    def new
      return process_profile if current_profile.present?

      redirect_to signup_path(oauth_data: oauth_data)
    end

  private

    def process_profile
      current_profile.update(lastfm_attributes)
      redirect_to settings_path
    end

    def lastfm_attributes
      oauth_data.slice(
        :nickname, :name, :country, :gender
      ).merge(
        lastfm_id:         oauth_data[:nickname],
        remote_avatar_url: oauth_data[:image]
      )
    end

    def oauth_data
      @oauth_data ||=
        request.env['omniauth.auth']['info'].symbolize_keys
    end
  end
end
