module Profiles
  class GroupsController < ApplicationController
    before_action :set_profile, :set_title

    def index
      set_groups
    end

  private

    def set_title
      @title = t(
        "profiles.groups.#{params[:action]}",
        profile: @profile.nickname
      )
    end

    def set_groups
      @groups = paginate(
        @profile.groups.members_count_desc, 20
      )
    end
  end
end
