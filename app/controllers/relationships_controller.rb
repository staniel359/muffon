class RelationshipsController < ApplicationController
  def create
    current_profile.active_relationships.where(
      following_id: params[:profile_id]
    ).first_or_create
    respond_with_js
  end

  def destroy
    current_profile.active_relationships.find_by(
      following_id: params[:profile_id]
    )&.destroy
    respond_with_js
  end
end
