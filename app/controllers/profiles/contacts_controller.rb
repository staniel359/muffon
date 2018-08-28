module Profiles
  class ContactsController < ApplicationController
    before_action :set_profile, :set_title

    def index
      @followers = profile_followers.first(5)
      @followings = profile_followings.first(5)
    end

    def followers
      @followers = paginate(profile_followers, 20)
    end

    def following
      @followings = paginate(profile_followings, 20)
    end

  private

    def set_title
      @title = t(
        "profiles.contacts.#{params[:action]}",
        profile: @profile.nickname
      )
    end

    def profile_followers
      @profile.followers
    end

    def profile_followings
      @profile.followings
    end
  end
end
