require 'sidekiq/web'

Rails.application.routes.draw do
  if Rails.env.development?
    mount GraphiQL::Rails::Engine,
      at: "/graphiql", graphql_path: "/graphql"
  end
  post "/graphql", to: "graphql#execute"
  mount Sidekiq::Web, at: '/sidekiq'
  mount ActionCable.server => '/cable'

  root 'muffon#start'
  scope module: 'muffon' do
    get 'dashboard'
    get 'welcome'
    get 'about'
    get 'help'
    get 'contribute'
    get 'contact'
  end
  scope module: 'connections' do
    get '/auth/lastfm/callback', to: 'lastfm#new'
    patch '/lastfm_disconnect', to: 'lastfm#disconnect'
    get '/lastfm_import', to: 'lastfm#import'
    patch '/lastfm_update', to: 'lastfm#update'
  end
  scope '/signup' do
    get '/', to: 'registrations#index', as: 'registrations'
    get '/show', to: 'registrations#show', as: 'registration'
    post '/', to: 'registrations#create'
    patch '/', to: 'registrations#update'
  end
  scope '/login' do
    get '/', to: 'sessions#new', as: 'login'
    post '/', to: 'sessions#create'
  end
  delete '/logout', to: 'sessions#destroy'
  resources :profiles, only: %i[index show update destroy],
    param: 'profile_id'
  namespace :profiles do
    scope '/:profile_id' do
      resources :groups, only: :index
      namespace :playlists do
        get '/search', to: 'search#index'
        namespace :search do
          get 'show_artist_tracks'
          get 'show_artist_albums'
          get 'show_album_tracks'
        end
        scope ':playlist_id' do
          resources :profile_tracks, only: %i[create destroy],
            param: 'profile_track_id'
          resources :tracks, only: %i[create destroy],
            param: 'track_id'
          resources :profile_albums, only: %i[create destroy],
            param: 'profile_album_id'
          resources :albums, only: %i[create destroy],
            param: 'album_id'
          resources :profile_artists, only: %i[create destroy],
            param: 'profile_artist_id'
        end
        namespace :profile_tracks do
          get 'add_to_playlists'
        end
        namespace :tracks do
          get 'add_to_playlists'
        end
      end
      resources :playlists, except: %i[new edit],
        param: 'playlist_name', constraints: { playlist_name: /.*/ }
      get '/library', to: 'library#show'
      namespace :library do
        get 'scope'
        patch 'scope'
        namespace :artists do
          scope ':artist_name', constraints: { artist_name: /.*/ } do
            namespace :tracks do
              scope '/:track_title', constraints: { track_title: /.*/ } do
                get 'albums'
                get 'plays'
              end
            end
            namespace :albums do
              scope '/:album_title', constraints: { album_title: /.*/ } do
                get 'tracks'
                get 'plays'
              end
            end
            resources :tracks, only: %i[index show],
              param: 'track_title', constraints: { track_title: /.*/ }
            resources :albums, only: %i[index show],
              param: 'album_title', constraints: { album_title: /.*/ }
            resources :plays, only: :index
          end
        end
        resources :artists, only: %i[index show create],
          param: 'artist_name', constraints: { artist_name: /.*/ }
        resources :albums, only: :index
        resources :tracks, only: :index
        resources :loved_tracks, only: :index
        resources :plays, only: :index
        resources :tags, only: %i[index show], param: 'tag_name',
          constraints: { tag_name: /.*/ }
        namespace :taggings do
          scope '/:tag_name', constraints: { tag_name: /.*/ } do
            get 'artists'
            get 'albums'
            get 'tracks'
          end
        end
        resources :taggings, only: %i[index show], param: 'tag_name',
          constraints: { tag_name: /.*/ }
        get '/search', to: 'search#index'
      end
      resources :contacts, only: :index
      scope module: 'contacts' do
        get 'followers'
        get 'following'
      end
      get '/board', to: 'microposts#index', as: :board
      resources :microposts, only: %i[create destroy],
        param: 'micropost_id'
    end
  end
  post '/follow', to: 'relationships#create'
  delete '/unfollow', to: 'relationships#destroy'
  resources :comments, only: %i[create destroy], param: 'comment_id'
  namespace :artists do
    scope '/:artist_name', constraints: { artist_name: /.*/ } do
      namespace :albums do
        scope '/:album_title', constraints: { album_title: /.*/ } do
          get 'tags'
          get 'wiki'
          get 'board'
        end
      end
      resources :albums, only: %i[index show], param: 'album_title',
        constraints: { album_title: /.*/ }
      namespace :tracks do
        scope '/:track_title', constraints: { track_title: /.*/ } do
          get 'tags'
          get 'wiki'
          get 'similar_tracks'
          get 'board'
        end
      end
      resources :tracks, only: %i[index show], param: 'track_title',
        constraints: { track_title: /.*/ }
      get 'images'
      get 'similar_artists'
      get 'wiki'
      get 'tags'
      get 'listeners'
      get 'plays'
      get 'board'
    end
  end
  resources :artists, only: :show, param: 'artist_name',
    constraints: { artist_name: /.*/ }
  namespace :tags do
    scope '/:tag_name', constraints: { tag_name: /.*/ } do
      get 'artists'
      get 'albums'
      get 'tracks'
    end
  end
  resources :tags, only: %i[index show], param: 'tag_name',
    constraints: { tag_name: /.*/ }
  resources :labels, only: %i[index show], param: 'label_name',
    constraints: { label_name: /.*/ }
  resources :playlists, only: :index
  resources :groups, except: %i[new edit], param: 'group_id'
  namespace :groups do
    scope '/:group_id' do
      get 'members'
    end
  end
  scope '/groups/:group_id' do
    post '/join', to: 'memberships#create', as: 'groups_join'
    delete '/leave', to: 'memberships#destroy', as: 'groups_leave'
  end
  resources :bookmarks, only: %i[index create destroy],
    param: 'model_type/:model_id'
  namespace :bookmarks do
    get 'artists'
    get 'albums'
    get 'tracks'
  end
  resources :listened_artists, only: %i[create destroy],
    param: 'artist_id'
  resources :conversations, only: %i[index show destroy],
    param: 'conversation_id'
  namespace :conversations do
    scope '/:conversation_id' do
      get 'load_messages'
      get 'read_messages'
    end
  end
  resources :messages, only: %i[new create], param: 'message_id'
  resources :settings, only: :index
  resources :notifications, only: :index
  get '/feed', to: 'feed#index'
  get '/player', to: 'player#show'
  namespace :player do
    get 'play'
    get 'wrong_track'
    patch 'confirm_track'
    get 'stop'
    get 'watch_on_youtube'
    namespace :queue do
      get 'send'
      delete 'delete'
      delete 'clear'
    end
  end
  get '/search', to: 'search#index'
  get '/sidebar_search', to: 'search#sidebar_search'
  namespace :search do
    resources :artists, only: :index
    resources :albums, only: :index
    resources :tracks, only: :index
  end
  resources :recommendations, only: %i[index destroy],
    param: 'recommendation_id'
  namespace :recommendations do
    scope '/:recommendation_id' do
      patch 'restore'
    end
  end
  get '/radio', to: 'radio#show'
  get '/play_radio', to: 'radio#play'

  resources :releases, only: :index
  namespace :releases do
    get 'new'
    get 'upcoming'
  end

  resources :stats, only: :index
  namespace :stats do
    scope module: 'scopes' do
      get 'plays_scope'
      get 'artists_scope'
      get 'tracks_scope'
      get 'tags_scope'
      get 'new_tracks_scope'
      get 'new_artists_scope'
      get 'tags_timeline_scope'
    end
  end

  get '/api', to: 'api#index'

  match '*path', :to => 'application#not_found', via: :all
end
