class GroupsController < ApplicationController
  before_action :set_profile, only: :profile_groups
  before_action :set_group, only: %i[show destroy]

  def index
    @title = 'Groups'
    @groups = Group.all
  end

  def profile_groups
    @title = "#{@profile.nickname}'s groups"
    @groups = @profile.groups
  end

  def new
    @title = 'Create a group'
  end

  def create
    group = Group.create(group_params)
    redirect_to group
  end

  def show
    @title = @group.name
  end

  def destroy
    @group.destroy

    redirect_to groups_path
  end

private

  def set_profile
    @profile = Profile.find_by(id: params[:id])
    redirect_to root_path unless @profile.present?
  end

  def set_group
    @group = Group.find_by(id: params[:group_id])
  end

  def group_params
    params.require(:group).permit(:owner_id, :name, :description, :avatar)
  end
end
