require 'sidekiq/web'

Rails.application.routes.draw do
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
    get '/lastfm_import', to: 'lastfm#import'
  end
  scope '/signup' do
    get '/', to: 'registrations#show', as: 'show_registration'
    get '/new', to: 'registrations#new', as: 'new_registration'
    post '/', to: 'registrations#create', as: 'registration'
    patch '/', to: 'registrations#update'
  end
  scope '/login' do
    get '/', to: 'sessions#new', as: 'login'
    post '/', to: 'sessions#create'
  end
  delete '/logout', to: 'sessions#destroy'
  resources :profiles, only: %i[index show update destroy], param: 'profile_id'
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
          resources :profile_tracks, only: %i[create destroy], param: 'profile_track_id'
          resources :tracks, only: %i[create destroy], param: 'track_id'
          resources :profile_albums, only: %i[create destroy], param: 'profile_album_id'
          resources :albums, only: %i[create destroy], param: 'album_id'
          resources :profile_artists, only: %i[create destroy], param: 'profile_artist_id'
        end
        namespace :profile_tracks do
          get 'add_to_playlists'
        end
        namespace :tracks do
          get 'add_to_playlists'
        end
      end
      resources :playlists, except: %i[new edit], param: 'playlist_name'
      get '/library', to: 'library#show'
      namespace :library do
        get 'scope'
        patch 'scope'
        resources :artists, only: %i[index show create], param: 'artist_name'
        namespace :artists do
          scope ':artist_name' do
            resources :tracks, only: %i[index show], param: 'track_title'
            namespace :tracks do
              scope '/:track_title' do
                get 'albums'
                get 'plays'
              end
            end
            resources :albums, only: %i[index show], param: 'album_title'
            namespace :albums do
              scope '/:album_title' do
                get 'tracks'
                get 'plays'
              end
            end
            resources :plays, only: :index
          end
        end
        resources :albums, only: :index
        resources :tracks, only: :index
        resources :loved_tracks, only: :index
        resources :plays, only: :index
        resources :tags, only: %i[index show], param: 'tag_name'
        resources :taggings, only: %i[index show], param: 'tag_name'
        namespace :taggings do
          scope '/:tag_name' do
            get 'artists'
            get 'albums'
            get 'tracks'
          end
        end
        get '/search', to: 'search#index'
      end
      resources :contacts, only: :index
      scope module: 'contacts' do
        get 'followers'
        get 'following'
      end
    end
  end
  scope module: 'contacts' do
    post '/follow', to: 'relationships#create'
    delete '/unfollow', to: 'relationships#destroy'
  end
  resources :artists, only: :show, param: 'artist_name'
  namespace :artists do
    scope '/:artist_name' do
      get 'images'
      get 'similar_artists'
      get 'wiki'
      get 'tags'
      get 'listeners'
      get 'plays'
      resources :tracks, only: :index
      resources :albums, only: %i[index show], param: 'album_title'
      namespace :albums do
        scope '/:album_title' do
          get 'tags'
          get 'wiki'
        end
      end
    end
  end
  resources :tags, only: %i[index show], param: 'tag_name'
  namespace :tags do
    scope '/:tag_name' do
      get 'artists'
      get 'albums'
      get 'tracks'
    end
  end
  resources :labels, only: %i[index show], param: 'label_name'
  resources :playlists, only: :index
  resources :groups, except: %i[new edit], param: 'group_id'
  namespace :groups do
    scope '/:group_id' do
      post '/join', to: 'memberships#create'
      delete '/leave', to: 'memberships#destroy'
    end
  end
  resources :bookmarks, only: %i[index create destroy], param: 'model_type/:model_id'
  namespace :bookmarks do
    get 'artists'
    get 'albums'
    get 'tracks'
  end
  resources :listened_artists, only: %i[create destroy], param: 'artist_id'
  resources :conversations, only: %i[index show destroy], param: 'conversation_id'
  scope module: 'conversations' do
    get 'load_messages'
    get 'read_messages'
    resources :messages, only: :create, param: 'message_id'
    namespace :messages do
      get 'open_modal'
    end
  end
  resources :settings, only: :index
  resources :notifications, only: :index
  get '/feed', to: 'feed#index'
  get '/player', to: 'player#show'
  namespace :player do
    get 'play'
    get 'play_next'
    patch 'confirm_vk_track'
    get 'stop'
    get 'send_to_queue'
    delete 'delete_from_queue'
    delete 'clear_queue'
    get 'watch_on_youtube'
  end
  get '/search', to: 'search#index'
  namespace :search do
    get 'artists'
    get 'albums'
    get 'tracks'
  end
  resources :recommendations, only: %i[index destroy], param: 'recommendation_id'
  namespace :recommendations do
    scope '/:recommendation_id' do
      patch 'restore'
    end
  end

  match '*path', :to => 'application#not_found', via: :all
end
