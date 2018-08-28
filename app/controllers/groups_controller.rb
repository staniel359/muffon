class GroupsController < ApplicationController
  before_action :set_title

  def index
    set_groups
  end

  def show
    set_group
  end

  def create
    group = current_profile.own_groups.create(group_params)
    redirect_to group
  end

  def update; end

  def destroy
    group.delete
    redirect_to groups_path
  end

private

  def set_title
    @title = t(
      "groups.#{params[:action]}",
      group: @group&.name
    )
  end

  def set_group
    @group = Group.find_by(id: params[:group_id])
  end

  def set_groups
    @groups = paginate(Group.members_count_desc, 20)
  end

  def group_params
    params.require(:group).permit(
      :owner_id, :name, :description, :avatar
    )
  end
end
