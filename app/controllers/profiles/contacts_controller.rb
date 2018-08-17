module Profiles
  class ContactsController < ApplicationController
    def index
      @page_data = {
        title:     title,
        profile:   profile
      }
    end

    def followers
      @page_data = {
        title:     title,
        profile:   profile
      }
    end

    def following
      @page_data = {
        title:     title,
        profile:   profile
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
