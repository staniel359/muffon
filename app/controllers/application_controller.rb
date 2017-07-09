class ApplicationController < ActionController::Base
  include SessionsHelper
  include ProfilesHelper
  include ArtistsHelper
  include LibraryHelper
  include ConversationsHelper

  protect_from_forgery with: :exception
  protect_from_forgery except: :show
end
