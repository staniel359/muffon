class GroupsController < ApplicationController
  def index
    set_groups
    set_title
  end

  def create
    set_new_group
    create_group if @new_group.save!
  end

  def show
    set_group
    set_title
    set_random_members
  end

  def members
    set_group
    set_title
    set_members
  end

  def update
    set_group.update(group_params)
    redirect_to @group
  end

  def destroy
    set_group&.destroy
    redirect_to groups_path
  end

private

  def set_groups
    @groups = paginate(Group.members_count_desc, 20)
  end

  def set_title
    @title = t(
      "groups.#{params[:action]}",
      group: @group&.name
    )
  end

  def set_new_group
    @new_group = current_profile.own_groups.new(group_params)
  end

  def create_group
    current_profile.memberships.create(
      group_id: @new_group.id, role: 'admin'
    )
    redirect_to @new_group
  end

  def group_params
    params.require(:group).permit(
      :owner_id, :name, :description, :avatar
    )
  end

  def set_group
    @group = Group.find_by(id: params[:group_id])
  end

  def set_random_members
    @members = @group.members.random.first(10)
  end

  def set_members
    @members = paginate(@group.members, 20)
  end
end
