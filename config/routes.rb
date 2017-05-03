require 'sidekiq/web'

Rails.application.routes.draw do
  
  root 'muffon#home'
  mount Sidekiq::Web, at: '/sidekiq'
  mount ActionCable.server => '/cable'

  get '/auth/lastfm/callback', to: 'profiles#new'
  post '/auth/lastfm/callback', to: 'profiles#create'
  get '/signup', to: 'profiles#new'
  post '/signup', to: 'profiles#create'

  resources :profiles
  get 'profiles/:id/library', to: 'profiles#library', as: 'library'

  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  get '/settings', to: 'muffon#settings'
  
end
