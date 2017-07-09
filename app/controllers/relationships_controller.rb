class RelationshipsController < ApplicationController
  def create
    current_profile.active_relationships.build(followed_id: params[:followed_id]).save!
    respond_to :js
  end

  def destroy
    current_profile.active_relationships.find_by(followed_id: params[:followed_id]).destroy!
    respond_to :js
  end
end
