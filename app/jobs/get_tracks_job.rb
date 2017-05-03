class GetTracksJob < ApplicationJob
	queue_as :default

  	def perform(profile_id)
  		profile = Profile.find_by(id: profile_id)

  		# Total entries count

  		recent_tracks_total = JSON.parse(open("http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=#{profile.lastfm_id}&api_key=fb914bd85f85f89d750e93c8bfb70012&format=json").read)['recenttracks']['@attr']['total'].to_i
  		top_artists_total = JSON.parse(open("http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=#{profile.lastfm_id}&api_key=fb914bd85f85f89d750e93c8bfb70012&format=json").read)['topartists']['@attr']['total'].to_i
  		top_albums_total = JSON.parse(open("http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=#{profile.lastfm_id}&api_key=fb914bd85f85f89d750e93c8bfb70012&format=json").read)['topalbums']['@attr']['total'].to_i
  		top_tracks_total = JSON.parse(open("http://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=#{profile.lastfm_id}&api_key=fb914bd85f85f89d750e93c8bfb70012&format=json").read)['toptracks']['@attr']['total'].to_i

  		entries_total = (recent_tracks_total + top_artists_total + top_albums_total + top_tracks_total).to_f

  		# Recent tracks import

    	ActionCable.server.broadcast "tracks_import", { profile_id: profile_id, total: recent_tracks_total, process: 'Importing listening history...' }
    	@counter = 0

    	recent_tracks_pages = JSON.parse(open("http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=#{profile.lastfm_id}&limit=200&api_key=fb914bd85f85f89d750e93c8bfb70012&format=json").read)['recenttracks']['@attr']['totalPages'].to_i
		recent_tracks_pages.downto(1) do |i|
			recent_tracks = JSON.parse(open("http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=#{profile.lastfm_id}&extended=1&limit=200&page=#{i}&api_key=fb914bd85f85f89d750e93c8bfb70012&format=json").read)['recenttracks']['track']
			recent_tracks.reverse.map do |t|
				artist = Artist.where(name: t['artist']['name']).first_or_create!
				track = Track.where(title: t['name'], artist: artist.id).first_or_create!
				album = Album.where(title: t['album']['#text'], artist: artist.id).first_or_create!

				profile_artist = ProfileArtist.where(artist_id: artist.id, profile: profile.id).first_or_create!
				profile_track = ProfileTrack.where(track_id: track.id, profile: profile.id).first_or_create!(created_at: t['date']['#text'], loved: t['loved'].to_i)
				profile_album = ProfileAlbum.where(album_id: album.id, profile: profile.id).first_or_create!

				Play.where(profile_id: profile.id, profile_track_id: profile_track.id, album_id: album.id, created_at: t['date']['#text']).first_or_create!

				@counter += 1
				width = (@counter / entries_total * 100)
				ActionCable.server.broadcast "tracks_import", { count: profile.plays.count, width: width }
			end
		end

  		# Top artists import

  		artists_counter = 0
  		ActionCable.server.broadcast "tracks_import", { total: top_artists_total, process: 'Updating artists...', count: artists_counter }

  		top_artists_pages = JSON.parse(open("http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=#{profile.lastfm_id}&limit=200&api_key=fb914bd85f85f89d750e93c8bfb70012&format=json").read)['topartists']['@attr']['totalPages'].to_i
  		1.upto(top_artists_pages) do |i|
  			top_artists = JSON.parse(open("http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=#{profile.lastfm_id}&limit=200&page=#{i}&api_key=fb914bd85f85f89d750e93c8bfb70012&format=json").read)['topartists']['artist']
  			
  			top_artists.map do |t|
  				artist = Artist.find_by(name: t['name'])
  				artist.update!(image: t['image'][3]['#text'])
  				ProfileArtist.find_by(artist_id: artist.id, profile: profile.id).update!(count: t['playcount'])

  				@counter += 1
  				artists_counter += 1
  				width = (@counter / entries_total * 100)
				ActionCable.server.broadcast "tracks_import", { count: artists_counter, width: width }
  			end
  		end

  		# Top albums import

  		albums_counter = 0
  		ActionCable.server.broadcast "tracks_import", { total: top_albums_total, process: 'Updating albums...', count: albums_counter }

  		top_albums_pages = JSON.parse(open("http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=#{profile.lastfm_id}&limit=200&api_key=fb914bd85f85f89d750e93c8bfb70012&format=json").read)['topalbums']['@attr']['totalPages'].to_i
  		1.upto(top_albums_pages) do |i|
  			top_albums = JSON.parse(open("http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=#{profile.lastfm_id}&limit=200&page=#{i}&api_key=fb914bd85f85f89d750e93c8bfb70012&format=json").read)['topalbums']['album']
  			
  			top_albums.map do |t|
  				artist = Artist.find_by(name: t['artist']['name'])
  				album = Album.find_by(title: t['name'], artist_id: artist.id)
  				album.update!(cover: t['image'][3]['#text'])
  				ProfileAlbum.find_by(album_id: album.id, profile: profile.id).update!(count: t['playcount'])

  				@counter += 1
  				albums_counter += 1
  				width = (@counter / entries_total * 100)
				ActionCable.server.broadcast "tracks_import", { count: albums_counter, width: width }
  			end
  		end

  		# Top tracks import

  		tracks_counter = 0
  		ActionCable.server.broadcast "tracks_import", { total: top_tracks_total, process: 'Updating tracks...', count: tracks_counter }

  		top_tracks_pages = JSON.parse(open("http://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=#{profile.lastfm_id}&limit=200&api_key=fb914bd85f85f89d750e93c8bfb70012&format=json").read)['toptracks']['@attr']['totalPages'].to_i
  		1.upto(top_tracks_pages) do |i|
  			top_tracks = JSON.parse(open("http://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=#{profile.lastfm_id}&limit=200&page=#{i}&api_key=fb914bd85f85f89d750e93c8bfb70012&format=json").read)['toptracks']['track']
  			top_tracks.map do |t|
  				artist = Artist.find_by(name: t['artist']['name'])
  				track = Track.find_by(title: t['name'], artist_id: artist.id)
  				ProfileTrack.find_by(track_id: track.id, profile: profile.id).update!(count: t['playcount'])

  				@counter += 1
  				tracks_counter += 1
  				width = (@counter / entries_total * 100)
				ActionCable.server.broadcast "tracks_import", { count: tracks_counter, width: width }
  			end
  		end
	end

	def perform(profile_id)
		i = 0
		1.upto(100) do |i|
			width = i
			ActionCable.server.broadcast "tracks_import_#{profile_id}", { profile_id: profile_id, message: i, width: width, profile_id: profile_id }
			i += 1
			sleep 0.5
		end
	end
end
