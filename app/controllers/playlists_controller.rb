class PlaylistsController < ApplicationController
	before_action :set_profile
	before_action :set_playlist, only: [:show, :edit, :update, :destroy, :new_track, :search_track, :add_track]

	def index
		@playlists = @profile.playlists
		@title = "#{@profile.nickname}'s playlists"
	end

	def new
		@playlist = @profile.playlists.build
		respond_to :js
	end

	def create
		@playlist = @profile.playlists.build(playlist_params)
		@playlist.save!
		respond_to :js
	end

	def show
		@tracks = @playlist.playlist_tracks
		@title = "#{@playlist.name} - #{@profile.nickname}'s playlists"
	end

	def edit

	end

	def update
	end

	def destroy
		@playlist.destroy!
		respond_to :js
	end

	def new_track
		respond_to :js
	end

	def search_track
		@search_results = @profile.profile_tracks.joins(:track).joins(:artist).where('lower(title) like lower(?) or lower(name) like lower(?)', "%#{params[:query]}%", "%#{params[:query]}%").select('profile_tracks.id as id, tracks.id as track_id, tracks.title as title, artists.name as artist_name, artists.image as image') unless params[:query] == ''
		respond_to :js
	end

	def add_track
		@playlist_track = @playlist.playlist_tracks.build(profile_track_id: params[:track_id])
		@playlist_track.save!
		respond_to :js
	end

	def delete_track
		current_profile.playlist_tracks.find(params[:track_id]).destroy!
		respond_to :js
	end

	private

		def set_profile
			@profile = Profile.find(params[:profile_id])
		end

		def set_playlist
			@playlist = Playlist.find(params[:id])
		end

		def playlist_params
			params.require(:playlist).permit(:profile_id, :name)
		end
end