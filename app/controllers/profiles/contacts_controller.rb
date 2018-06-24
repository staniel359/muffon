module Profiles
  class ContactsController < ApplicationController
    def contacts
      @page_data = {
        title:     title,
        followers: profile.followers,
        following: profile.followings
      }
    end

    def followers
      @page_data = {
        title:     title,
        followers: profile.followers
      }
    end

    def following
      @page_data = {
        title:     title,
        following: profile.followings
      }
    end

  private

    def title
      t(
        "profiles.contacts.#{params[:action]}",
        profile: profile.nickname
      )
    end
  end
end
