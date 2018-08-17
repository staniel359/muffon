require 'sidekiq/web'

Sidekiq::Web.use(Rack::Auth::Basic) do |user, password|
  [user, password] == ["sidekiq", Rails.application.credentials.sidekiq[:password]]
end
