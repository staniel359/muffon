require 'sidekiq/web'

Rails.application.routes.draw do
  mount Sidekiq::Web, at: '/sidekiq'
  mount Backstage::Engine, at: '/backstage'
  mount ActionCable.server => '/cable'

  root 'muffon#root'

  get '/auth/lastfm/callback', to: 'accounts#new'

  get '/signup', to: 'signup#new'
  post '/signup', to: 'signup#create'

  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  resources :profiles, except: %i[new create], param: 'profile_id',
    controller: 'profiles/main'
  namespace :profiles do
    scope ':profile_id' do
      resources :groups, only: :index

      resources :playlists, param: 'playlist_name'
      namespace :playlists do
        scope ':playlist_name' do
          resources :tracks, only: %i[create destroy]
          get '/search', to: 'tracks#search'
          resources :profile_tracks, only: :create

          resources :profile_artists, only: :create
          get '/search/artists/:profile_artist_id/tracks',
            to: 'profile_artists#show_tracks',
            as: 'artist_show_tracks'
          resources :artists, only: :destroy

          resources :albums, only: %i[create destroy]
          get '/search/albums/:profile_album_id/tracks',
            to: 'profile_albums#show_tracks',
            as: 'album_show_tracks'
          resources :profile_albums, only: :create
        end
      end

      namespace :library do
        get '/', to: 'main#show'

        get '/search', to: 'main#search'

        get '/scope', to: 'main#scope'
        patch '/default_scope', to: 'main#default_scope'

        scope '/artists/:name' do
          get '/', to: 'artists#show', as: 'artist'

          scope '/tracks' do
            get '/', to: 'artists#tracks', as: 'artist_tracks'
            get '/:title', to: 'artists#track', as: 'artist_track'
            get '/:title/plays', to: 'artists#track_plays', as: 'artist_track_plays'
          end

          scope '/albums' do
            get '/', to: 'artists#albums', as: 'artist_albums'
            get '/:title', to: 'artists#album', as: 'artist_album'
            get '/:title/plays', to: 'artists#album_plays', as: 'artist_album_plays'
          end

          get '/plays', to: 'artists#plays', as: 'artist_plays'
        end

        get '/artists', to: 'main#artists'
        get '/albums', to: 'main#albums'
        get '/tracks', to: 'main#tracks'
        get '/plays', to: 'main#plays'

        scope '/tags' do
          get '/', to: 'tags#index', as: 'tags'
          get '/:tag_name', to: 'tags#show', as: 'tag'
        end
        
        scope '/taggings' do
          get '/', to: 'taggings#index', as: 'taggings'

          scope '/:tagging_name' do
            get '/', to: 'taggings#show', as: 'tagging'
            get '/artists', to: 'taggings#artists', as: 'tagging_artists'
            get '/albums', to: 'taggings#albums', as: 'tagging_albums'
            get '/tracks', to: 'taggings#tracks', as: 'tagging_tracks'
          end
        end
      end

      resources :contacts, only: :index
      scope 'contacts' do
        get '/followers', to: 'contacts#followers', as: 'followers'
        get '/following', to: 'contacts#following', as: 'following'
      end
    end
  end

  get '/follow/:followed_id', to: 'relationships#follow', as: 'follow'
  get '/unfollow/:followed_id', to: 'relationships#unfollow', as: 'unfollow'

  scope '/tracks/:track_id' do
    get '/message_modal',
      to: 'track_actions#message_modal',
      as: 'track_message_modal'
    get '/playlists_modal',
      to: 'track_actions#playlists_modal',
      as: 'track_playlists_modal'
    post '/add_to_playlists',
      to: 'track_actions#add_to_playlists',
      as: 'track_add_to_playlists'
  end

  scope '/artists/:artist_name' do
    get '/', to: 'artists#show', as: 'artist'
    get '/images', to: 'artists#images', as: 'artist_images'
    get '/tracks', to: 'artists#tracks', as: 'artist_tracks'
    get '/albums', to: 'artists#albums', as: 'artist_albums'
    scope '/albums/:album_title' do
      get '/', to: 'artists#album', as: 'artist_album'
      get '/tags', to: 'artists#album_tags', as: 'artist_album_tags'
      get '/wiki', to: 'artists#album_wiki', as: 'artist_album_wiki'
    end
    get '/similar', to: 'artists#similar_artists', as: 'artist_similar_artists'
    get '/wiki', to: 'artists#wiki', as: 'artist_wiki'
    get '/tags', to: 'artists#tags', as: 'artist_tags'
    get '/listeners', to: 'artists#listeners', as: 'artist_listeners'
    get '/plays', to: 'artists#plays', as: 'artist_plays'
  end

  resources :tags, only: %i[index show], param: :tag_name
  scope '/tags/:tag_name' do
    get '/artists', to: 'tags#artists', as: 'tag_artists'
    get '/albums', to: 'tags#albums', as: 'tag_albums'
    get '/tracks', to: 'tags#tracks', as: 'tag_tracks'
  end

  resources :labels, only: :show, param: :label_name

  resources :playlists, only: :index

  resources :groups, param: :group_id
  namespace :groups do
    scope '/:group_id' do
      post '/join', to: 'memberships#create', as: 'join_group'
      post '/leave', to: 'memberships#destroy', as: 'leave_group'
    end
  end

  get '/bookmarks', to: 'bookmarks#index', as: 'bookmarks'

  namespace :artist_actions do
    resources :bookmarks, only: %i[create destroy], param: :bookmark_id
    resources :listened_artists, only: %i[create destroy],
      param: :listened_artist_id
    resources :library_artists, only: %i[create destroy],
      param: :library_artist_id
  end

  resources :conversations, only: %i[index show destroy],
    param: :conversation_id, controller: 'conversations/main'
  namespace :conversations do
    resources :messages, only: %i[new create destroy], param: :message_id
  end

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
    get '/', to: 'search#index', as: 'search'
    get '/artists', to: 'search#artists', as: 'search_artists'
    get '/albums', to: 'search#albums', as: 'search_albums'
    get '/tracks', to: 'search#tracks', as: 'search_tracks'
  end

  get '/recommendations', to: 'recommendations#index'
  patch '/delete_recommendation', to: 'recommendations#delete'
  patch '/restore_recommendation', to: 'recommendations#restore'

  get '/settings', to: 'muffon#settings'

  get '/about', to: 'muffon#about'
  get '/help', to: 'muffon#help'
  get '/contribute', to: 'muffon#contribute'
  get '/contact', to: 'muffon#contact'
end
