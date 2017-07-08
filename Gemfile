source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?('/')
  "https://github.com/#{repo_name}.git"
end

gem 'actionpack-action_caching'
gem 'bcrypt'
gem 'bootstrap-sass'
gem 'carrierwave'
gem 'coffee-rails'
gem 'font-awesome-rails'
gem 'foreman'
gem 'haml'
gem 'jbuilder'
gem 'jquery-rails'
gem 'listen'
gem 'mini_magick'
gem 'omniauth'
gem 'omniauth-lastfm'
gem 'pg'
gem 'puma'
gem 'rails'
gem 'rails-controller-testing'
gem 'redis'
gem 'remotipart'
gem 'sass-rails'
gem 'sidekiq'
gem 'soundcloud'
gem 'sqlite3'
gem 'turbolinks'
gem 'uglifier'
gem 'will_paginate'

group :development, :test do
  gem 'byebug', platform: :mri
end

group :development do
  gem 'capistrano'
  gem 'capistrano-bundler'
  gem 'capistrano-rails'
  gem 'capistrano-rvm'
  gem 'spring'
  gem 'spring-watcher-listen'
  gem 'web-console'
end

gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
