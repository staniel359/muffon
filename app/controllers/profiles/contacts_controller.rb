module Profiles
  class ContactsController < ApplicationController
    before_action :set_profile, :set_title

    def index
      set_followers
      set_followings
    end

    def followers
      set_followers
    end

    def following
      set_followings
    end

  private

    def set_title
      @title = t(
        "profiles.contacts.#{params[:action]}",
        profile: @profile.nickname
      )
    end

    def set_followers
      @followers = paginate(@profile.followers, 20)
    end

    def set_followings
      @followings = paginate(@profile.followings, 20)
    end
  end
end
