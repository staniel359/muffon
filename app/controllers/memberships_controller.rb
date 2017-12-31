class MembershipsController < ApplicationController
  before_action :set_group

  def join
    current_profile.memberships.create(
      group_id: params[:group_id], role: 'member'
    )

    respond_to do |format|
      format.js { render 'membership', layout: false }
    end
  end

  def leave
    current_profile.memberships.find_by(
      group_id: params[:group_id]
    ).destroy

    respond_to do |format|
      format.js { render 'membership', layout: false }
    end
  end

private

  def set_group
    @group = Group.find_by(id: params[:group_id])
  end
end
