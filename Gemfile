source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?('/')
  "https://github.com/#{repo_name}.git"
end

gem 'bcrypt'
gem 'bootsnap', require: false
gem 'bootstrap'
gem 'carrierwave'
gem 'chartkick'
gem 'draper'
gem 'flag-icons-rails'
gem 'groupdate'
gem 'haml'
gem 'i18n_data'
gem 'jbuilder'
gem 'jquery-rails'
gem 'jquery-ui-rails'
gem 'kaminari'
gem 'listen'
gem 'mini_magick'
gem 'nokogiri'
gem 'omniauth'
gem 'pg'
gem 'puma'
gem 'rails'
gem 'redis'
gem 'remotipart'
gem 'rest-client'
gem 'rubocop', '0.65.0', require: false
gem 'rubocop-rspec', '~>1.27.0', require: false
gem 'sassc-rails'
gem 'sidekiq'
gem 'travis'
gem 'turbolinks'
gem 'uglifier'

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

group :development, :test do
  gem 'rspec-rails'
  gem 'vcr'
  gem 'webmock'
  gem 'factory_bot_rails'
  gem 'database_cleaner'
end

gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
