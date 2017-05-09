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
  patch 'profiles/:id/library', to: 'profiles#library'
  get 'profiles/:id/library/artists', to: 'profiles#artists', as: 'library_artists'
  get 'profiles/:id/library/artists', to: 'profiles#change_artists_scope', as: 'change_artists_scope'
  get 'profiles/:id/library/artists/:artist_id', to: 'profiles#artist', as: 'library_artist'
  get 'profiles/:id/library/artists/:artist_id/plays', to: 'profiles#artist_plays', as: 'library_artist_plays'
  get 'profiles/:id/library/artists/:artist_id/tracks', to: 'profiles#artist_tracks', as: 'library_artist_tracks'
  get 'profiles/:id/library/artists/:artist_id/albums', to: 'profiles#artist_albums', as: 'library_artist_albums'
  get 'profiles/:id/library/albums', to: 'profiles#albums', as: 'library_albums'
  get 'profiles/:id/library/albums/:album_id', to: 'profiles#album', as: 'library_album'
  get 'profiles/:id/library/albums/:album_id/plays', to: 'profiles#album_plays', as: 'library_album_plays'
  get 'profiles/:id/library/tracks', to: 'profiles#tracks', as: 'library_tracks'
  get 'profiles/:id/library/plays', to: 'profiles#plays', as: 'library_plays'
  
  get '/recommendations', to: 'muffon#recommendations'
  patch '/recommendations', to: 'muffon#recommendations'

  resources :artists, only: :show, constraints: { id: /.*/ }

  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  get '/settings', to: 'muffon#settings'
  
end
