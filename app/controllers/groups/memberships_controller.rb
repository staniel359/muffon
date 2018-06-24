module Groups
  class MembershipsController < ApplicationController
    def create
      current_profile.join_group(params[:group_id])
      respond_with_js
    end

    def destroy
      current_profile.leave_group(params[:group_id])
      respond_with_js
    end
  end
end
