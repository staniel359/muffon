require 'test_helper'

class ProfilesControllerTest < ActionDispatch::IntegrationTest
  
  test 'should get signup path' do
  	get signup_path
  	assert_response :success
  end

  test 'should sign up' do
  	post signup_path, params: {profile: {nickname: 'nickname', name: 'bilb ono', country: 'Belarus', city: 'Minsk', birthdate: 'Fri, 28 Apr 2017', gender: 'Male', email: 'email@mail.com', password: 'password', password_confirmation: 'password', lastfm_id: ''}}
  	assert_redirected_to root_path
    follow_redirect!
    assert_select 'title', 'muffon | Home'
    assert_not request.cookie_jar.signed[:profile_id].nil?
  end

  test 'should sign up via last.fm' do
    post signup_path, params: {profile: {nickname: 'nickname', name: 'bilb ono', country: 'Belarus', city: 'Minsk', birthdate: 'Fri, 28 Apr 2017', gender: 'Male', email: 'email@mail.com', password: 'password', password_confirmation: 'password', lastfm_id: 'cornwell_93'}}, xhr: true
    assert_template 'shared/_error_messages'
    post signup_path, params: {profile: {nickname: 'nickname', name: 'bilb ono', country: 'Belarus', city: 'Minsk', birthdate: 'Fri, 28 Apr 2017', gender: 'Male', email: 'email@mail.com', password: 'password', password_confirmation: 'password', lastfm_id: 'lastfm'}}
    assert_redirected_to root_path
    follow_redirect!
    assert_select 'title', 'muffon | Home'
    assert_not request.cookie_jar.signed[:profile_id].nil?
  end

  test 'nickname should be present' do
  	post signup_path, params: {profile: {nickname: '', email: 'email@mail.com', password: 'password', password_confirmation: 'password'}}, xhr: true
  	assert_template 'shared/_error_messages'
  end

  test 'email should be present' do
  	post signup_path, params: {profile: {nickname: 'nickname', email: '', password: 'password', password_confirmation: 'password'}}, xhr: true
  	assert_template 'shared/_error_messages'
  end

  test 'password should be present' do
  	post signup_path, params: {profile: {nickname: 'nickname', email: 'email@mail.com', password: '', password_confirmation: 'password'}}, xhr: true
  	assert_template 'shared/_error_messages'
  end

  test 'password_confirmation should be present' do
  	post signup_path, params: {profile: {nickname: 'nickname', email: 'email@mail.com', password: 'password', password_confirmation: ''}}, xhr: true
  	assert_template 'shared/_error_messages'
  end

  test 'passwords should match' do
  	post signup_path, params: {profile: {nickname: '', email: 'email@mail.com', password: 'password', password_confirmation: 'wrongpassword'}}, xhr: true
  	assert_template 'shared/_error_messages'
  end

  test 'nickname should be unique' do
  	profile = profiles(:one)
  	post signup_path, params: {profile: {nickname: profile.nickname, email: 'email@mail.com', password: 'password', password_confirmation: 'password'}}, xhr: true
  	assert_template 'shared/_error_messages'
  end

  test 'email should be unique' do
  	profile = profiles(:one)
  	post signup_path, params: {profile: {nickname: 'nickname', email: profile.email, password: 'password', password_confirmation: 'password'}}, xhr: true
  	assert_template 'shared/_error_messages'
  end

  test 'should update profile' do
    profile = profiles(:one)
    log_in_as(profile, '')
    patch profile_path(profile), params: {profile: {nickname: 'nickname', email: 'stan@mail.com', password: '', password_confirmation: ''}}, xhr: true
    assert_template 'shared/_error_messages'
    profile.reload
    assert_equal 'staniel', profile.nickname
    patch profile_path(profile), params: {profile: {nickname: 'nickname', email: 'stan@mail.com', password: 'password', password_confirmation: ''}}, xhr: true
    assert_template 'shared/_error_messages'
    profile.reload
    assert_equal 'staniel', profile.nickname
    patch profile_path(profile), params: {profile: {nickname: 'nickname', email: 'stan@mail.com', password: 'password', password_confirmation: 'wrongpass'}}, xhr: true
    assert_template 'shared/_error_messages'
    profile.reload
    assert_equal 'staniel', profile.nickname
    patch profile_path(profile), params: {profile: {nickname: 'nickname', email: 'stan@mail.com', password: 'password', password_confirmation: 'password'}}, xhr: true
    assert_template 'shared/_flash_messages'
    profile.reload
    assert_equal 'nickname', profile.nickname
  end

  test 'shouldn\'t update others profile' do
    profile = profiles(:one)
    profile2 = profiles(:two)
    log_in_as(profile, '')
    patch profile_path(profile2), params: {profile: {nickname: 'nickname', email: 'stan@mail.com', password: 'password', password_confirmation: 'password'}}
    assert_redirected_to root_path
    profile2.reload
    assert_equal 'MyString', profile2.nickname
    assert_equal 'MyString', profile2.email
    assert_equal 'MyString', profile2.password_digest
  end

  test 'should destroy own account' do
    profile = profiles(:one)
    log_in_as(profile, '')
    assert_difference 'Profile.count', -1 do
      delete profile_path(profile)
    end
    assert_redirected_to root_path
  end

  test 'shouldn\'t destroy other account' do
    profile = profiles(:one)
    profile2 = profiles(:two)
    log_in_as(profile, '')
    assert_no_difference 'Profile.count', -1 do
      delete profile_path(profile2)
    end
    assert_redirected_to root_path
  end

end
