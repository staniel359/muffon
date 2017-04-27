Rails.application.routes.draw do
  
  root 'muffon#welcome'

  get '/signup', to: 'profiles#new'
  post '/signup', to: 'profiles#create'
  resources :profiles, only: [:index, :show, :edit, :update, :destroy]

  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  get '/settings', to: 'muffon#settings'
  
end
