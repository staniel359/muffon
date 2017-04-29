require 'test_helper'

class SessionsControllerTest < ActionDispatch::IntegrationTest
  
  test 'should get login path' do
  	get login_path
  	assert_response :success
  end

  test 'should login' do
  	profile = profiles(:one)
  	post login_path, params: {session: {email: profile.email, password: 'password'}}
  	assert_redirected_to root_path
    assert_not session[:profile_id].nil?
  end

  test 'should login if present' do
  	post login_path, params: {session: {email: 'wrongemail@mail.com', password: 'password'}}, xhr: true
    assert_template 'shared/_flash_messages'
  end

  test 'should login if valid info' do
  	post login_path, params: {session: {email: 'staniel359@gmail.com', password: 'wrongpassword'}}, xhr: true
    assert_template 'shared/_flash_messages'
  end

  test 'should be forgotten when logs out' do
    log_in_as(profiles(:one), '1')
    assert_not session[:profile_id].nil?
    assert_not request.cookie_jar.signed[:profile_id].nil?
    delete logout_path
    assert_not session[:profile_id].present?
    assert_not request.cookie_jar.signed[:profile_id].present?
  end

end
