require 'test_helper'

class ProfileTest < ActiveSupport::TestCase
  
  test 'profile should be valid' do
  	profile = profiles(:one)
  	profile.password = 'password'
  	assert profile.valid?
  	profile.nickname = ''
  	assert_not profile.valid?
  	profile.email = ''
  	assert_not profile.valid?
  	profile.password = ''
  	assert_not profile.valid?
  end
end
