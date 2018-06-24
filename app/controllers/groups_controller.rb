class GroupsController < ApplicationController
  def index
    @page_data = {
      title:  title,
      groups: groups
    }
  end

  def show
    @page_data = {
      title: title,
      group: group
    }
  end

  def create
    group = Group.create(group_params)
    redirect_to group
  end

  def destroy
    group.delete
    redirect_to groups_path
  end

private

  def set_title
    @title = t(
      "groups.#{params[:action]}",
      group: group&.name
    )
  end

  def group
    @group ||= Group.find_by(id: params[:group_id])
  end

  def groups
    paginate(Group.members_count_desc, 20)
  end

  def group_params
    params.require(:group).permit(
      :owner_id, :name, :description, :avatar
    )
  end
end
