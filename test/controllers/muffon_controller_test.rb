require 'test_helper'

class MuffonControllerTest < ActionDispatch::IntegrationTest
  
  test 'should get settings path' do
  	log_in_as(profiles(:one))
  	get settings_path
  	assert_response :success
  end
end
