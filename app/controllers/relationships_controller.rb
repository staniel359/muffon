class RelationshipsController < ApplicationController
  before_action :set_profile, only: %i[contacts followers following]

  def create
    current_profile.active_relationships.new(
      followed_id: params[:followed_id]
    ).save

    respond_to do |format|
      format.js { render layout: false }
    end
  end

  def destroy
    current_profile.active_relationships.find_by(
      followed_id: params[:followed_id]
    ).destroy

    respond_to do |format|
      format.js { render layout: false }
    end
  end

  def contacts
    @title = "#{@profile.nickname}'s contacts"
    @followers = @profile.followers
    @following = @profile.followeds
  end

  def followers
    @title = "#{@profile.nickname}'s followers"
    @followers = @profile.followers
  end

  def following
    @title = "#{@profile.nickname}'s following"
    @following = @profile.followeds
  end

private

  def set_profile
    @profile = Profile.find(params[:id])
  end
end
