module Contacts
  class RelationshipsController < ApplicationController
    def create
      current_profile.follow(params[:following_id])
      respond_with_js
    end

    def destroy
      current_profile.unfollow(params[:following_id])
      respond_with_js
    end
  end
end
