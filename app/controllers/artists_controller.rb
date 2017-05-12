class ArtistsController < ApplicationController

	def show
		@artist = JSON.parse(open("http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=#{CGI.escape(params[:id])}&api_key=#{ENV["LASTFM_KEY"]}&format=json").read)['artist']
		@albums = JSON.parse(open("http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=#{CGI.escape(params[:id])}&api_key=#{ENV["LASTFM_KEY"]}&format=json").read)['topalbums']['album'].delete_if {|a| a['name'] == '(null)'}.sort_by {|a| a['playcount'].to_i}.reverse.first(4)
		@tracks = JSON.parse(open("http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=#{CGI.escape(params[:id])}&api_key=#{ENV["LASTFM_KEY"]}&format=json").read)['toptracks']['track'].sort_by {|t| t['playcount'].to_i}.reverse.first(15)
		@title = @artist['name']
	end
end
