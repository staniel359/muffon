source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?('/')
  "https://github.com/#{repo_name}.git"
end

gem 'bcrypt'
gem 'bootsnap', require: false
gem 'bootstrap-datepicker-rails'
gem 'bootstrap'
gem 'carrierwave'
gem 'coffee-rails'
gem 'country_select'
gem 'flag-icons-rails'
gem 'haml'
gem 'jbuilder'
gem 'jquery-rails'
gem 'listen'
gem 'kaminari', github: 'kaminari'
gem 'mini_magick'
gem 'nokogiri'
gem 'omniauth'
gem 'omniauth-lastfm'
gem 'pg'
gem 'puma'
gem 'rails'
gem 'redis'
gem 'remotipart'
gem 'rest-client'
gem 'rubocop', require: false
gem 'sassc-rails'
gem 'sidekiq'
gem 'turbolinks'
gem 'uglifier'

gem "backstage", :path => "/mnt/d/backstage"

group :development do
  gem 'byebug', platform: :mri
  gem 'capistrano'
  gem 'capistrano-bundler'
  gem 'capistrano-rails'
  gem 'capistrano-rvm'
  gem 'pry'
  gem 'pry-rails'
  gem 'spring'
  gem 'spring-watcher-listen'
  gem 'web-console'
end

gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
