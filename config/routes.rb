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

      get '/artists_scope', to: 'library#artists_scope', as: 'artists_scope'
      patch '/artists_scope', to: 'library#artists_scope', as: 'artists_default_scope'
      get '/albums_scope', to: 'library#albums_scope', as: 'albums_scope'
      patch '/albums_scope', to: 'library#albums_scope', as: 'albums_default_scope'
      get '/tracks_scope', to: 'library#tracks_scope', as: 'tracks_scope'
      patch '/tracks_scope', to: 'library#tracks_scope', as: 'tracks_default_scope'

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

      get '/artists', to: 'library#artists', as: 'library_artists'
      get '/albums', to: 'library#albums', as: 'library_albums'
      get '/tracks', to: 'library#tracks', as: 'library_tracks'
      get '/plays', to: 'library#plays', as: 'library_plays'
      
      scope '/tags' do
        get '/', to: 'tags#index', as: 'library_tags'
        get '/:name', to: 'tags#show', as: 'library_tag'
        get '/:name/artists', to: 'tags#artists', as: 'library_artists_tag'
        get '/:name/albums', to: 'tags#albums', as: 'library_albums_tag'
        get '/:name/tracks', to: 'tags#tracks', as: 'library_tracks_tag'
      end
    end

    resources :playlists, param: 'playlist_name'
    scope '/playlists/:playlist_name' do
      post '/tracks/:profile_track_id', to: 'playlist_tracks#add_track', as: 'playlist_add_track'
      delete '/tracks/:playlist_track_id', to: 'playlist_tracks#delete_track', as: 'playlist_delete_track'

      post '/artists/:profile_artist_id', to: 'playlist_tracks#add_artist', as: 'playlist_add_artist'
      delete '/artists/:playlist_artist_id', to: 'playlist_tracks#delete_artist', as: 'playlist_delete_artist'

      post '/albums/:profile_album_id', to: 'playlist_tracks#add_album', as: 'playlist_add_album'
      delete '/albums/:playlist_album_id', to: 'playlist_tracks#delete_album', as: 'playlist_delete_album'

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
    get '/tracks', to: 'artists#tracks', as: 'artist_tracks', constraints: { name: /[^\/]+/ }
    get '/albums', to: 'artists#albums', as: 'artist_albums', constraints: { name: /[^\/]+/ }
    get '/albums/:title', to: 'artists#album', as: 'artist_album', constraints: { name: /[^\/]+/, title: /[^\/]+/ }
    get '/similar', to: 'artists#similar_artists', as: 'artist_similar_artists'
  end

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
  get '/delete_playing_now', to: 'player#delete_playing_now'
  get '/send_to_queue', to: 'player#send_to_queue'
  get '/delete_from_queue', to: 'player#delete_from_queue'
  get '/clear_queue', to: 'player#clear_queue'
  patch '/confirm_track', to: 'player#confirm_track'

  scope '/search' do
    get '/', to: 'search#search', as: 'search'
    get '/artist', to: 'search#artist', as: 'search_artist'
    get '/album', to: 'search#album', as: 'search_album'
    get '/track', to: 'search#track', as: 'search_track'
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
