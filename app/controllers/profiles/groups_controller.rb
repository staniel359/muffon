module Profiles
  class GroupsController < ApplicationController
    def index
      @page_data = {
        title:   title,
        profile: profile,
        groups:  groups
      }
    end

  private

    def title
      t(
        "profiles.groups.#{params[:action]}",
        profile: profile.nickname
      )
    end

    def groups
      paginate(profile.groups.members_count_desc, 20)
    end
  end
end
