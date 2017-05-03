class ApplicationController < ActionController::Base
	include SessionsHelper

	protect_from_forgery with: :exception
	protect_from_forgery except: :show
end
