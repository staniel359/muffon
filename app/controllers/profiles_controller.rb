class ProfilesController < ApplicationController
	before_action :should_login, only: [:index, :update, :destroy]
	before_action :set_profile, only: [:show, :update, :update_artists, :destroy, :library, :artists, :artist, :artist_albums, :artist_plays, :artist_tracks, :albums, :album, :album_plays, :tracks, :track_plays, :plays]
	before_action :correct_profile, only: [:update, :destroy]
	before_action :set_artist, only: [:artist, :artist_albums, :artist_plays, :artist_tracks]
	before_action :set_album, only: [:album, :album_plays]
	before_action :set_track, only: :track_plays

	# caches_action :library, unless: -> { params[:artists_scope] || params[:albums_scope] || stale?(Profile.find_by(id: params[:id])) }

	def index
		@title = 'Profiles'
		@profiles = Profile.all
		@profile = current_profile
	end

	def new
		@title = 'Sign up'
		@button_text = 'Create an account'
		if params[:token]
			auth = request.env['omniauth.auth']['info']
			@profile = Profile.find_by(lastfm_id: auth['nickname'])
			if @profile
				redirect_to login_path
				flash[:warning] = "Looks like you've already signed in via your Last.fm account."
			else
				@profile = Profile.new(nickname: auth['nickname'], 
									   name: auth['name'], 
									   country: auth['country'], 
									   gender: auth['gender'], 
									   remote_avatar_url: auth['image'], 
									   lastfm_id: auth['nickname'])
			end
		else
			@profile = Profile.new
		end
	end

	def create
		@profile = Profile.new(primary_params)
		if @profile.valid?
			@profile = Profile.create(profile_params)
			if @profile.save
				log_out
				log_in @profile
				remember @profile
				redirect_to root_path
				if @profile.lastfm_id.present?
					GetTracksJob.perform_later(@profile.id)
				end
			else
				respond_to :js
			end
		else
			respond_to :js
		end
	end

	def show
		@title = "#{@profile.nickname}'s profile"
		unless current_profile?(@profile)
			get_common_artists
		end
	end

	def update
		@profile.update(profile_params)
		if @profile.save
			respond_to :js
			flash.now[:success] = 'Profile was updated.'
		else
			respond_to :js
		end
	end

	def update_artists
		@profile.update!(library_artists_scope: params[:scope]) if current_profile?(@profile)
		respond_to :js
	end

	def destroy
		@profile.destroy
		redirect_to root_path
	end

	def library
		if params[:artists_scope]
			get_scoped_artists(params[:artists_scope].to_i)
			respond_to :js
		elsif params[:albums_scope]
			get_scoped_albums(params[:albums_scope].to_i)
			respond_to :js
		elsif (params[:artists_default_scope] && current_profile?(@profile))
			@profile.update!(top_artists_scope: params[:artists_default_scope].to_i)
			respond_to :js
		elsif params[:albums_default_scope]
			@profile.update!(top_albums_scope: params[:albums_default_scope].to_i)
			respond_to :js
		else
			@title = "#{@profile.nickname}'s library"
			get_scoped_artists(@profile.top_artists_scope)
			get_scoped_albums(@profile.top_albums_scope)
			@top_tracks = @profile.profile_tracks.joins(:plays).group('profile_tracks.id').order('count(profile_tracks.id) desc').limit(8)
			@plays = @profile.plays.order(created_at: :desc).first(9)
			@new_tracks = @profile.profile_tracks.order(created_at: :desc).first(4)
			@loved_tracks = @profile.profile_tracks.where(loved: 1).order(created_at: :desc).first(4)
			@top_tags = @profile.profile_tags.order(count: :desc).first(10)
		end
	end

	def artists
		@title = "#{@profile.nickname}'s artists"
		if params[:scope]
			if params[:scope] == '1'
				order = 'count(profile_artists.id) desc'
			elsif params[:scope] == '2'
				order = 'count(profile_artists.id) asc'
			elsif params[:scope] == '3'
				order = 'created_at desc'
			elsif params[:scope] == '4'
				order = 'created_at asc'
			end
			@artists = @profile.profile_artists.joins(:plays).group('profile_artists.id').order(order).paginate(page: params[:page], per_page: 20)
			respond_to :js
		else
			@artists = @profile.profile_artists.joins(:plays).group('profile_artists.id').order('count(profile_artists.id) desc').paginate(page: params[:page], per_page: 20)
		end
	end

	def artist
		@title = "#{@artist.artist.name} in #{@profile.nickname}'s library"
		@tracks = @artist.profile_tracks.joins(:plays).group('profile_tracks.id').order('count(profile_tracks.id) desc').limit(5)
		@albums = @artist.profile_albums.joins(:plays).group('profile_albums.id').order('count(profile_albums.id) desc').limit(3)
		@plays = @artist.plays.order(created_at: :desc).first(5)
	end

	def artist_albums
		@title = "#{@artist.artist.name} plays in #{@profile.nickname}'s library"
		@albums = @artist.profile_albums.joins(:plays).group('profile_albums.id').order('count(profile_albums.id) desc').paginate(page: params[:page], per_page: 20)
	end

	def artist_plays
		@title = "#{@artist.artist.name} plays in #{@profile.nickname}'s library"
		@plays = @artist.plays.order(created_at: :desc).paginate(page: params[:page], per_page: 20)
	end

	def artist_tracks
		@title = "#{@artist.artist.name} tracks in #{@profile.nickname}'s library"
		@tracks = @artist.profile_tracks.joins(:plays).group('profile_tracks.id').order('count(profile_tracks.id) desc').paginate(page: params[:page], per_page: 20)
	end

	def albums
		@title = "#{@profile.nickname}'s albums"
		if params[:scope]
			if params[:scope] == '1'
				order = 'count(profile_albums.id) desc'
			elsif params[:scope] == '2'
				order = 'count(profile_albums.id) asc'
			elsif params[:scope] == '3'
				order = 'created_at desc'
			elsif params[:scope] == '4'
				order = 'created_at asc'
			end
			@albums = @profile.profile_albums.joins(:plays).group('profile_albums.id').order(order).paginate(page: params[:page], per_page: 20)
			respond_to :js
		else
			@albums = @profile.profile_albums.joins(:plays).group('profile_albums.id').order('count(profile_albums.id) desc').paginate(page: params[:page], per_page: 20)
		end
	end

	def album
		@title = "#{@album.album.artist.name} - #{@album.album.title} in #{@profile.nickname}'s library"
		@tracks = @profile.profile_tracks.where("'?' = any(profile_albums)", @album.id)
		@tracks.joins(:plays).group('profile_tracks.id').order('count(profile_tracks.id) desc')
		@plays = @album.plays.order(created_at: :desc).first(10)
	end

	def album_plays
		@title = "#{@album.album.artist.name} - #{@album.album.title} plays in #{@profile.nickname}'s library"
		@plays = @album.plays.order(created_at: :desc).paginate(page: params[:page], per_page: 20)
	end

	def tracks
		@title = "#{@profile.nickname}'s tracks"
		@tracks = @profile.profile_tracks.joins(:plays).group('profile_tracks.id').order('count(profile_tracks.id) desc').paginate(page: params[:page], per_page: 20)
	end

	def track_plays
		@title = "#{@track.artist.name} - #{@track.track.title} plays in #{@profile.nickname}'s library"
		@plays = @track.plays.order(created_at: :desc).paginate(page: params[:page], per_page: 20)
	end

	def plays
		@title = "#{@profile.nickname}'s plays"
		@plays = @profile.plays.order(created_at: :desc).paginate(page: params[:page], per_page: 20)
	end

	private

		def primary_params
			params.require(:profile).permit(:lastfm_id, :nickname, :email, :password, :password_confirmation)
		end

		def profile_params
			params.require(:profile).permit(:lastfm_id, :nickname, :name, :country, :city, :birthdate, :gender, :avatar, :remote_avatar_url, :email, :password, :password_confirmation, :library_artists_scope, :top_artists_scope)
		end

		def correct_profile
			unless current_profile?(Profile.find_by(id: params[:id]))
				redirect_to root_path
			end
		end

		def set_profile
			@profile = Profile.find_by(id: params[:id])
		end

		def correct_profile
			unless current_profile?(@profile = Profile.find_by(id: params[:id]))
				redirect_to root_path
			end
		end

		def set_artist
			@artist = @profile.profile_artists.find(params[:artist_id])
		end

		def set_album
			@album = @profile.profile_albums.find(params[:album_id])
		end

		def set_track
			@track = @profile.profile_tracks.find(params[:track_id])
		end
end
