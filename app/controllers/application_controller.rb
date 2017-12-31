class ApplicationController < ActionController::Base
  include SessionsHelper
  protect_from_forgery with: :exception
  protect_from_forgery except: :show
  before_action :set_redis

private

  def set_redis
    @redis ||= Redis.new(url: 'redis://localhost:6379')
  end
end
