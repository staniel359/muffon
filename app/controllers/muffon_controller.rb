class MuffonController < ApplicationController
  before_action :should_login, only: %i[
    settings notifications feed recommendations bookmarks
  ]

  def home
    @title = (logged_in? ? 'Home' : 'Welcome')
  end

  def settings
    @title = 'Settings'
    @button_text = 'Save changes'
  end

  def notifications
    @title = 'Notifications'
  end

  def feed
    @title = 'Feed'
  end

  def player
    @title = 'Player'
  end

  def about
    @title = 'About'
  end

  def help
    @title = 'Help'
  end

  def contribute
    @title = 'Contribute'
  end

  def contact
    @title = 'Contact'
  end
end
