class ApplicationController < ActionController::Base
	include SessionsHelper

	protect_from_forgery with: :exception
end
