require 'test_helper'

class SessionsControllerTest < ActionDispatch::IntegrationTest
  
  test 'should get login path' do
  	get login_path
  	assert_response :success
  end

  test 'should login' do
  	profile = profiles(:one)
  	post login_path, params: {session: {email: profile.email, password: 'password'}}
  	follow_redirect!
  	assert_template 'profiles/show'
  end

  test 'should login if present' do
  	post login_path, params: {session: {email: 'wrongemail@mail.com', password: 'password'}}
  	assert_redirected_to login_path
  end

  test 'should login if valid info' do
  	post login_path, params: {session: {email: 'staniel359@gmail.com', password: 'wrongpassword'}}
  	assert_redirected_to login_path
  end

end
