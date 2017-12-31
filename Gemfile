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
gem 'haml'
gem 'jbuilder'
gem 'jquery-rails'
gem 'jquery-ui-rails'
gem 'listen'
gem 'kaminari', github: 'kaminari'
gem 'mini_magick'
gem 'omniauth'
gem 'omniauth-lastfm'
gem 'pg'
gem 'puma'
gem 'rails'
gem 'rails-controller-testing'
gem 'redis'
gem 'remotipart'
gem 'rest-client'
gem 'sass-rails'
gem 'sidekiq'
gem 'sidekiq-throttler'
gem 'turbolinks'
gem 'uglifier'

group :development, :test do
  gem 'byebug', platform: :mri
end

group :development do
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
