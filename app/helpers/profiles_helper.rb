module ProfilesHelper

	def get_scoped_artists(scope)
		if ((scope == 0) || (scope == nil))
			@top_artists = @profile.profile_artists.order(count: :desc).first(8)
		elsif
			@scoped_plays = @profile.plays.where('created_at > ?', Time.now-scope.to_i.days)
			@top_artists = @scoped_plays.group(:profile_artist_id).select(:profile_artist_id).order('count(*) desc').map {|a| profile_artist = ProfileArtist.find(a.profile_artist_id); profile_artist.count = @scoped_plays.where(profile_artist_id: profile_artist.id).count; profile_artist}.first(8)
		end
	end

	def get_scoped_albums(scope)
		if ((scope == 0) || (scope == nil))
			@top_albums = @profile.profile_albums.order(count: :desc).first(6)
		elsif
			@scoped_plays = @profile.plays.where('created_at > ? and album_id is not null', Time.now-scope.to_i.days)
			@top_albums = @scoped_plays.group(:profile_album_id).select(:profile_album_id).order('count(*) desc').map {|a| profile_album = ProfileAlbum.find(a.profile_album_id); profile_album.count = @scoped_plays.where(profile_album_id: profile_album.id).count; profile_album}.first(6)
		end
	end

	def get_common_artists
		@common_artists = (current_profile.profile_artists.map(&:artist_id) & @profile.profile_artists.map(&:artist_id)).map {|a| Artist.find(a).profile_artists.find_by(profile_id: @profile.id)}.sort_by(&:count).reverse
	end

	def update_artists_images
		top_artists_pages = JSON.parse(open("http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=#{@profile.lastfm_id}&limit=200&api_key=fb914bd85f85f89d750e93c8bfb70012&format=json").read)['topartists']['@attr']['totalPages'].to_i
  		1.upto(top_artists_pages) do |i|
  			top_artists = JSON.parse(open("http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=#{@profile.lastfm_id}&limit=200&page=#{i}&api_key=fb914bd85f85f89d750e93c8bfb70012&format=json").read)['topartists']['artist']
  			
  			top_artists.map do |t|
  				artist = Artist.find_by('lower(name) = lower(?)', t['name'])
  				artist.update!(image: t['image'][3]['#text'])
  			end
  		end
  	end
end
