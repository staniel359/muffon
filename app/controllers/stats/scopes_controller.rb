module Stats
  class ScopesController < ApplicationController
    before_action :scoped_data, :respond_with_js

  private

    def scoped_data
      instance_variable_set(
        "@#{stat_name}_data",
        stat_service.call(scope_params)
      )
    end

    def stat_name
      params[:action].sub('_scope', '')
    end

    def stat_service
      "Muffon::Stats::#{stat_name.camelize}".constantize
    end

    def scope_params
      {
        profile_id: current_profile.id,
        scope: params.slice(:year, :month, :day)
      }
    end
  end
end
