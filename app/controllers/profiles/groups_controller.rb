module Profiles
  class GroupsController < ApplicationController
    def index
      @page_data = {
        title:  title,
        groups: profile.groups
      }
    end

  private

    def title
      t(
        "profiles.groups.#{params[:action]}",
        profile: profile.nickname
      )
    end
  end
end
