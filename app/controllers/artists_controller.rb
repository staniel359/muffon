class ArtistsController < ApplicationController

	def show
		@artist = JSON.parse(open("http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=#{CGI.escape(params[:id])}&api_key=#{ENV["LASTFM_KEY"]}&format=json").read)['artist']
		@albums = JSON.parse(open("http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=#{CGI.escape(params[:id])}&api_key=#{ENV["LASTFM_KEY"]}&format=json").read)['topalbums']['album'].delete_if {|a| a['name'] == '(null)'}.sort_by {|a| a['playcount'].to_i}.reverse.first(4)
		@tracks = JSON.parse(open("http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=#{CGI.escape(params[:id])}&api_key=#{ENV["LASTFM_KEY"]}&format=json").read)['toptracks']['track'].sort_by {|t| t['playcount'].to_i}.reverse.first(10)
		@title = @artist['name']
		update_artist_image(@artist)
		@spotify_tracks = JSON.parse(open("https://api.spotify.com/v1/search?q=#{(CGI.escape(@artist['name']))}&type=track&limit=50&market=US").read)['tracks']['items']
	end

	def tracks
		@title = "#{params[:id]} tracks"
		@tracks = JSON.parse(open("http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=#{CGI.escape(params[:id])}&api_key=#{ENV["LASTFM_KEY"]}&format=json").read)['toptracks']['track'].sort_by {|t| t['playcount'].to_i}.reverse
		@spotify_tracks = JSON.parse(open("https://api.spotify.com/v1/search?q=#{(CGI.escape(params[:id]))}&type=track&limit=50&market=US").read)['tracks']['items']
	end

	def albums
		@title = "#{params[:id]} albums"
		@albums = JSON.parse(open("http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=#{CGI.escape(params[:id])}&api_key=#{ENV["LASTFM_KEY"]}&format=json").read)['topalbums']['album'].delete_if {|a| a['name'] == '(null)'}.sort_by {|a| a['playcount'].to_i}.reverse
	end

	def album
		@album = JSON.parse(open("http://ws.audioscrobbler.com/2.0/?method=album.getinfo&artist=#{CGI.escape(params[:id])}&album=#{CGI.escape(params[:album_id].gsub('_', '/'))}&api_key=#{ENV["LASTFM_KEY"]}&format=json").read)['album']
		@title = @album['artist'] + ' - ' + @album['name']
		if !@album['tracks']['track'].empty?
			@tracks = @album['tracks']['track']
		else
			get_tracks_from_musicbrainz(@album)
		end
		spotify_albums = JSON.parse(open("https://api.spotify.com/v1/search?q=#{CGI.escape(@album['artist'])}+#{CGI.escape(@album['name'])}&type=album&market=US").read)['albums']['items']
		if !spotify_albums.empty?
			spotify_album = spotify_albums.find {|a| a['name'].downcase == @album['name'].downcase}
			if spotify_album
				@spotify_album_uri = spotify_album['uri']
			end
		end
	end
end
