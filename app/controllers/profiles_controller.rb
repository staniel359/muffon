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
		@title = "#{@profile.nickname}'s library"
		if (params[:artists_scope] || params[:albums_scope])
			if params[:artists_scope]
				get_scoped_artists(params[:artists_scope].to_i)
			elsif params[:albums_scope]
				get_scoped_albums(params[:albums_scope].to_i)
			end
		elsif (params[:artists_default_scope] || params[:albums_default_scope])
			if (params[:artists_default_scope] && current_profile?(@profile))
				@profile.update!(top_artists_scope: params[:artists_default_scope].to_i)
			elsif params[:albums_default_scope]
				@profile.update!(top_albums_scope: params[:albums_default_scope].to_i)
			end
			respond_to :js
		else
			get_scoped_artists(@profile.top_artists_scope)
			get_scoped_albums(@profile.top_albums_scope)
		end
		@top_tracks = @profile.profile_tracks.order(count: :desc).first(10)
		@plays = @profile.plays.order(created_at: :desc).first(10)
		@new_tracks = @profile.profile_tracks.order(created_at: :desc).first(5)
		@loved_tracks = @profile.loved_tracks.order(created_at: :desc).first(5)
		@top_tags = @profile.profile_tags.order(count: :desc).first(10)	
	end

	def artists
		@title = "#{@profile.nickname}'s artists"
		@artists = @profile.profile_artists.order(count: :desc).paginate(page: params[:page], per_page: 20)
	end

	def artist
		@title = "#{@artist.artist.name} in #{@profile.nickname}'s library"
		@tracks = @artist.profile_tracks.order(count: :desc).first(5)
		@albums = @artist.profile_albums.order(count: :desc).first(3)
		@plays = @artist.plays.order(created_at: :desc).first(5)
	end

	def artist_albums
		@title = "#{@artist.artist.name} plays in #{@profile.nickname}'s library"
		@albums = @artist.profile_albums.order(count: :desc).paginate(page: params[:page], per_page: 20)
	end

	def artist_plays
		@title = "#{@artist.artist.name} plays in #{@profile.nickname}'s library"
		@plays = @artist.plays.order(created_at: :desc).paginate(page: params[:page], per_page: 20)
	end

	def artist_tracks
		@title = "#{@artist.artist.name} tracks in #{@profile.nickname}'s library"
		@tracks = @artist.profile_tracks.order(count: :desc).paginate(page: params[:page], per_page: 20)
	end

	def albums
		@title = "#{@profile.nickname}'s albums"
		@albums = @profile.profile_albums.order(count: :desc).paginate(page: params[:page], per_page: 20)
	end

	def album
		@title = "#{@album.album.artist.name} - #{@album.album.title} in #{@profile.nickname}'s library"
		@tracks = @profile.profile_tracks.where("'?' = any(profile_albums)", @album.id).order(count: :desc)
		@plays = @album.plays.order(created_at: :desc).first(10)
	end

	def album_plays
		@title = "#{@album.album.artist.name} - #{@album.album.title} plays in #{@profile.nickname}'s library"
		@plays = @album.plays.order(created_at: :desc).paginate(page: params[:page], per_page: 20)
	end

	def tracks
		@title = "#{@profile.nickname}'s tracks"
		@tracks = @profile.profile_tracks.order(count: :desc).paginate(page: params[:page], per_page: 20)
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
