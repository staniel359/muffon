class ArtistsController < ApplicationController
  before_action :refresh_artist_image, except: :show

  def show
    @artist = JSON.parse(open("http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=#{(params[:id].include?('%2F') ? params[:id] : CGI.escape(params[:id]))}&api_key=#{ENV['LASTFM_KEY']}&format=json").read)['artist']
    @artist_image = @artist['image'][3]['#text']
    @albums = JSON.parse(open("http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=#{(params[:id].include?('%2F') ? params[:id] : CGI.escape(params[:id]))}&api_key=#{ENV['LASTFM_KEY']}&format=json").read)['topalbums']['album'].delete_if { |a| a['name'] == '(null)' }.sort_by { |a| a['playcount'].to_i }.reverse.first(4)
    @tracks = JSON.parse(open("http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=#{(params[:id].include?('%2F') ? params[:id] : CGI.escape(params[:id]))}&api_key=#{ENV['LASTFM_KEY']}&format=json").read)['toptracks']['track'].sort_by { |t| t['playcount'].to_i }.reverse.first(10)
    @title = @artist['name']
    update_artist_image(@artist)
    # @spotify_tracks = JSON.parse(open("https://api.spotify.com/v1/search?q=#{(CGI.escape(@artist['name']))}&type=track&limit=50&market=US").read)['tracks']['items']
    @max_count = @tracks.first['playcount'].to_i
  end

  def tracks
    if params[:page]
      response = JSON.parse(open("http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=#{(params[:id].include?('%2F') ? params[:id] : CGI.escape(params[:id]))}&page=#{params[:page].to_i}&api_key=#{ENV['LASTFM_KEY']}&format=json").read)['toptracks']
    else
      response = JSON.parse(open("http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=#{(params[:id].include?('%2F') ? params[:id] : CGI.escape(params[:id]))}&api_key=#{ENV['LASTFM_KEY']}&format=json").read)['toptracks']
    end
    @artist_name = response['@attr']['artist']
    @title = "#{@artist_name} tracks"
    @tracks = response['track'].sort_by { |t| t['playcount'].to_i }.reverse
    @total_pages = response['@attr']['totalPages']
    # @spotify_tracks = JSON.parse(open("https://api.spotify.com/v1/search?q=#{(CGI.escape(params[:id]))}&type=track&limit=50&market=US").read)['tracks']['items']
    @max_count = @tracks.first['playcount'].to_i
  end

  def albums
    @albums = JSON.parse(open("http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=#{(params[:id].include?('%2F') ? params[:id] : CGI.escape(params[:id]))}&api_key=#{ENV['LASTFM_KEY']}&format=json").read)['topalbums']['album'].delete_if { |a| a['name'] == '(null)' }.sort_by { |a| a['playcount'].to_i }.reverse
    @artist_name = @albums.first['artist']['name']
    @title = "#{@artist_name} albums"
  end

  def album
    @album = JSON.parse(open("http://ws.audioscrobbler.com/2.0/?method=album.getinfo&artist=#{(params[:id].include?('%2F') ? params[:id] : CGI.escape(params[:id]))}&album=#{(params[:album_id].include?('%2F') ? params[:album_id] : CGI.escape(params[:album_id]))}&api_key=#{ENV['LASTFM_KEY']}&format=json").read)['album']
    @title = @album['artist'] + ' - ' + @album['name']
    @album_cover = @album['image'][3]['#text']
    if !@album['tracks']['track'].empty?
      @tracks = @album['tracks']['track']
    else
      get_tracks_from_musicbrainz(@album)
    end
    # spotify_albums = JSON.parse(open("https://api.spotify.com/v1/search?q=#{CGI.escape(@album['artist'])}+#{CGI.escape(@album['name'])}&type=album&market=US").read)['albums']['items']
    # if !spotify_albums.empty?
    #   spotify_album = spotify_albums.find {|a| a['name'].downcase == @album['name'].downcase}
    #   if spotify_album
    #     @spotify_album_uri = spotify_album['uri']
    #   end
    # end
  end

  def similar
    if params[:page]
      data = JSON.parse(open("http://ws.audioscrobbler.com/2.0/?method=artist.getSimilar&limit=#{params[:page].to_i * 15}&artist=#{(params[:id].include?('%2F') ? params[:id] : CGI.escape(params[:id]))}&api_key=#{ENV['LASTFM_KEY']}&format=json").read)['similarartists']
    else
      data = JSON.parse(open("http://ws.audioscrobbler.com/2.0/?method=artist.getSimilar&limit=15&artist=#{(params[:id].include?('%2F') ? params[:id] : CGI.escape(params[:id]))}&api_key=#{ENV['LASTFM_KEY']}&format=json").read)['similarartists']
    end
    @artist = data['@attr']['artist']
    @title = "#{@artist} similar artists"
    @artists = data['artist'].last(15)
  end

  private

    def refresh_artist_image
      @artist_image = JSON.parse(open("http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=#{(params[:id].include?('%2F') ? params[:id] : CGI.escape(params[:id]))}&api_key=#{ENV['LASTFM_KEY']}&format=json").read)['artist']['image'][3]['#text']
    end
end
