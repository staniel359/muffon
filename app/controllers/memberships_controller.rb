class MembershipsController < ApplicationController
  before_action :set_group

  def create
    join_group
    respond_with_js
  end

  def destroy
    leave_group
    respond_with_js
  end

private

  def set_group
    @group = Group.find_by(id: params[:group_id])
  end

  def join_group
    current_profile.memberships.where(
      group_id: @group.id
    ).first_or_create
  end

  def leave_group
    current_profile.memberships.find_by(
      group_id: @group.id
    )&.destroy
  end
end
