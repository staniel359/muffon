require 'sidekiq/web'

Rails.application.routes.draw do
  root 'muffon#home'
  mount Sidekiq::Web, at: '/sidekiq'
  mount ActionCable.server => '/cable'

  get 'auth/lastfm/callback', to: 'profiles#new'
  post '/auth/lastfm/callback', to: 'profiles#create'
  get '/signup', to: 'profiles#new'
  post '/signup', to: 'profiles#create'

  resources :profiles
  resources :playlists, path: '/profile/:profile_id/playlists'
  resources :playlist_tracks, only: [:new, :create, :destroy], path: '/profile/:profile_id/playlist_tracks'
  get '/playlist_tracks/search', to: 'playlist_tracks#search', as: 'search_playlist_tracks'
  scope '/profiles/:id/library' do
    get '/', to: 'library#show', as: 'library'
    get '/library_scope', to: 'library#library_scope', as: 'library_scope'
    get '/library_default_scope', to: 'library#library_default_scope', as: 'library_default_scope'
    get '/artists', to: 'library#artists', as: 'library_artists'
    get '/artists_scope', to: 'library#artists_scope', as: 'library_artists_scope'
    get '/artists/:artist_id', to: 'library#artist', as: 'library_artist'
    get '/artists/:artist_id/tracks', to: 'library#artist_tracks', as: 'library_artist_tracks'
    get '/artists/:artist_id/albums', to: 'library#artist_albums', as: 'library_artist_albums'
    get '/artists/:artist_id/plays', to: 'library#artist_plays', as: 'library_artist_plays'
    get '/albums', to: 'library#albums', as: 'library_albums'
    get '/albums_scope', to: 'library#albums_scope', as: 'library_albums_scope'
    get '/albums/:album_id', to: 'library#album', as: 'library_album'
    get '/albums/:album_id/plays', to: 'library#album_plays', as: 'library_album_plays'
    get '/tracks', to: 'library#tracks', as: 'library_tracks'
    get '/tracks_scope', to: 'library#tracks_scope', as: 'library_tracks_scope'
    get '/tracks/:track_id/plays', to: 'library#track_plays', as: 'library_track_plays'
    get '/plays', to: 'library#plays', as: 'library_plays'
  end
  get '/artists/:id', to: 'artists#show', as: 'artist', constraints: { id: /[^\/]+/ }
  get '/artists/:id/tracks', to: 'artists#tracks', as: 'artist_tracks', constraints: { id: /[^\/]+/ }
  get '/artists/:id/albums', to: 'artists#albums', as: 'artist_albums', constraints: { id: /[^\/]+/ }
  get '/artists/:id/albums/:album_id', to: 'artists#album', as: 'artist_album', constraints: { album_id: /[^\/]+/, id: /[^\/]+/ }
  get '/artists/:id/similar', to: 'artists#similar', as: 'artist_similar'

  post '/listened', to: 'muffon#listened'
  delete '/listened', to: 'muffon#listened'

  post '/bookmark', to: 'muffon#bookmark'
  delete '/bookmark', to: 'muffon#bookmark'

  get '/import_plays', to: 'muffon#import_plays'

  resources :conversations, only: [:index, :show, :destroy]
  resources :messages, only: [:new, :create, :destroy]

  get '/notifications', to: 'muffon#notifications'

  get '/feed', to: 'muffon#feed'

  get '/player', to: 'muffon#player'

  get '/search', to: 'muffon#search'

  get '/recommendations', to: 'muffon#recommendations'
  patch '/recommendations', to: 'muffon#recommendations'

  get '/bookmarks', to: 'muffon#bookmarks', as: 'bookmarks'

  get '/settings', to: 'muffon#settings'

  get '/about', to: 'muffon#about'
  get '/help', to: 'muffon#help'
  get '/contribute', to: 'muffon#contribute'

  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
end
