ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'

class ActiveSupport::TestCase
  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  # Add more helper methods to be used by all tests here...
end

class ActionDispatch::IntegrationTest
	include SessionsHelper

	def log_in_as(profile, remember_me)
		post login_path, params: {session: {email: profile.email, password: 'password', profile_id: profile.id, remember_me: remember_me}}
	end
end