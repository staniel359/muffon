require 'sidekiq/web'

Rails.application.routes.draw do
  mount Sidekiq::Web, at: '/sidekiq'
  mount ActionCable.server => '/cable'

  root 'muffon#home'

  get 'auth/lastfm/callback', to: 'profiles#new'
  post '/auth/lastfm/callback', to: 'profiles#create'
  get '/signup', to: 'profiles#new'
  post '/signup', to: 'profiles#create'

  resources :profiles

  scope 'profiles/:id' do

    scope 'library' do
      get '/', to: 'library#show', as: 'library'

      get 'search', to: 'library#search', as: 'library_search'

      get '/library_scope', to: 'library#library_scope', as: 'library_scope'
      patch '/library_default_scope', to: 'library#library_default_scope', as: 'library_default_scope'

      scope '/artists/:name', constraints: { name: /[^\/]+/ } do
        get '/', to: 'library_artists#show', as: 'library_artist'
        get '/tracks', to: 'library_artists#tracks', as: 'library_artist_tracks'
        get '/tracks/:title', to: 'library_artists#track', as: 'library_artist_track', constraints: { title: /[^\/]+/ }
        get '/tracks/:title/plays', to: 'library_artists#track_plays', as: 'library_artist_track_plays', constraints: { title: /[^\/]+/ }
        get '/albums', to: 'library_artists#albums', as: 'library_artist_albums'
        get '/albums/:title', to: 'library_artists#album', as: 'library_artist_album', constraints: { title: /[^\/]+/ }
        get '/albums/:title/plays', to: 'library_artists#album_plays', as: 'library_artist_album_plays', constraints: { title: /[^\/]+/ }
        get '/plays', to: 'library_artists#plays', as: 'library_artist_plays'
      end
      post '/artists/:artist_id', to: 'library_artists#create', as: 'create_library_artist'

      get '/artists', to: 'library#artists', as: 'library_artists'
      get '/albums', to: 'library#albums', as: 'library_albums'
      get '/tracks', to: 'library#tracks', as: 'library_tracks'
      get '/plays', to: 'library#plays', as: 'library_plays'
      
      scope '/tags' do
        get '/', to: 'library_tags#index', as: 'library_tags'
        get '/:name', to: 'library_tags#show', as: 'library_tag'
        get '/:name/artists', to: 'library_tags#artists', as: 'library_artists_tag'
        get '/:name/albums', to: 'library_tags#albums', as: 'library_albums_tag'
        get '/:name/tracks', to: 'library_tags#tracks', as: 'library_tracks_tag'
      end
    end

    resources :playlists, param: 'playlist_name'
    get '/show_playlists', to: 'playlists#show_playlists', as: 'show_playlists'
    post '/tracks/:track_id/add_track_to_playlists', to: 'playlist_tracks#add_track_to_playlists', as: 'add_track_to_playlists'

    scope '/playlists/:playlist_name' do
      post '/tracks/:profile_track_id', to: 'playlist_tracks#add_profile_track', as: 'playlist_add_profile_track'
      post '/tracks/:track_id', to: 'playlist_tracks#add_track', as: 'playlist_add_track'
      delete '/tracks/:track_id', to: 'playlist_tracks#delete_track', as: 'playlist_delete_track'

      post '/artists/:profile_artist_id', to: 'playlist_tracks#add_profile_artist', as: 'playlist_add_profile_artist'
      delete '/artists/:artist_id', to: 'playlist_tracks#delete_artist', as: 'playlist_delete_artist'

      post '/albums/:profile_album_id', to: 'playlist_tracks#add_profile_album', as: 'playlist_add_profile_album'
      post '/albums/:album_id', to: 'playlist_tracks#add_album', as: 'playlist_add_album'
      delete '/albums/:album_id', to: 'playlist_tracks#delete_album', as: 'playlist_delete_album'

      get '/search', to: 'playlist_tracks#search', as: 'playlist_search'
      get '/search/artists/:profile_artist_id/tracks', to: 'playlist_tracks#show_artist_tracks', as: 'playlist_search_artist_tracks'
      get '/search/albums/:profile_album_id/tracks', to: 'playlist_tracks#show_album_tracks', as: 'playlist_search_album_tracks'
    end

    scope 'contacts' do
      get '/', to: 'relationships#contacts', as: 'profile_contacts'
      get '/followers', to: 'relationships#followers', as: 'profile_followers'
      get '/following', to: 'relationships#following', as: 'profile_following'
    end

    get '/groups', to: 'groups#profile_groups', as: 'profile_groups'
  end

  scope '/artists/:name' do
    get '/', to: 'artists#show', as: 'artist', constraints: { name: /[^\/]+/ }
    get '/images', to: 'artists#images', as: 'artist_images', constraints: { name: /[^\/]+/ }
    get '/tracks', to: 'artists#tracks', as: 'artist_tracks', constraints: { name: /[^\/]+/ }
    get '/albums', to: 'artists#albums', as: 'artist_albums', constraints: { name: /[^\/]+/ }
    get '/albums/:title', to: 'artists#album', as: 'artist_album', constraints: { name: /[^\/]+/, title: /[^\/]+/ }
    get '/albums/:title/tags', to: 'artists#album_tags', as: 'artist_album_tags', constraints: { name: /[^\/]+/, title: /[^\/]+/ }
    get '/similar', to: 'artists#similar_artists', as: 'artist_similar_artists'
    get '/wiki', to: 'artists#wiki', as: 'artist_wiki'
    get '/tags', to: 'artists#tags', as: 'artist_tags'

    get '/listeners', to: 'artists#listeners', as: 'artist_listeners'
    get '/plays', to: 'artists#plays', as: 'artist_plays'
  end

  resources :tags, only: %i[index show], param: :name
  get '/tags/:name/artists', to: 'tags#artists', as: 'tag_artists'
  get '/tags/:name/albums', to: 'tags#albums', as: 'tag_albums'
  get '/tags/:name/tracks', to: 'tags#tracks', as: 'tag_tracks'

  resources :labels, only: :show, param: :name

  resources :groups, param: :group_id

  post '/join_group', to: 'memberships#join', as: 'join_group'
  post '/leave_group', to: 'memberships#leave', as: 'leave_group'

  get '/follow', to: 'relationships#create', as: 'follow'
  get '/unfollow', to: 'relationships#destroy', as: 'unfollow'

  resources :listened_artists, only: %i[create destroy]
  resources :bookmarks, only: %i[index create destroy]

  get '/import_plays', to: 'muffon#import_plays'

  resources :conversations, only: [:index, :show, :destroy]
  resources :messages, only: [:new, :create, :destroy]

  get '/notifications', to: 'muffon#notifications'

  get '/feed', to: 'muffon#feed'

  get '/player', to: 'muffon#player'

  get '/play', to: 'player#play'
  get '/stop', to: 'player#stop'
  get '/watch_on_youtube', to: 'player#watch_on_youtube'
  get '/send_to_queue', to: 'player#send_to_queue'
  delete '/delete_from_queue', to: 'player#delete_from_queue'
  delete '/clear_queue', to: 'player#clear_queue'
  patch '/confirm_track', to: 'player#confirm_track'

  scope '/search' do
    get '/', to: 'search#search', as: 'search'
    get '/artist', to: 'search#artists', as: 'search_artists'
    get '/album', to: 'search#albums', as: 'search_albums'
    get '/track', to: 'search#tracks', as: 'search_tracks'
  end

  get '/recommendations', to: 'recommendations#index'
  patch '/delete_recommendation', to: 'recommendations#delete'
  patch '/restore_recommendation', to: 'recommendations#restore'

  get '/settings', to: 'muffon#settings'

  get '/about', to: 'muffon#about'
  get '/help', to: 'muffon#help'
  get '/contribute', to: 'muffon#contribute'
  get '/contact', to: 'muffon#contact'

  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
end
