class ArtistsController < ApplicationController

	def show
		@artist = JSON.parse(open("http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=#{CGI.escape(params[:id])}&api_key=fb914bd85f85f89d750e93c8bfb70012&format=json").read)['artist']
		@title = @artist['name']
		@albums = JSON.parse(open("http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=#{CGI.escape(params[:id])}&api_key=fb914bd85f85f89d750e93c8bfb70012&format=json").read)['topalbums']['album'].first(4)
		@tracks = JSON.parse(open("http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=#{CGI.escape(params[:id])}&api_key=fb914bd85f85f89d750e93c8bfb70012&format=json").read)['toptracks']['track'].first(15)
	end
end
