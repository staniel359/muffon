class RefreshTracksJob < ApplicationJob
	queue_as :default

	def perform(profile_id)
	    profile = Profile.find_by(id: profile_id)

	    recent_tracks_paging = true
		i = 1

		while recent_tracks_paging do
			recent_tracks = JSON.parse(open("http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=#{profile.lastfm_id}&extended=1&limit=200&page=#{i}&api_key=#{ENV["LASTFM_KEY"]}&format=json").read)['recenttracks']['track']
			recent_tracks.each do |t|
				if Time.at(t['date']['uts'].to_i).to_time > time
					artist = Artist.where('lower(name) = lower(?)', t['artist']['name']).first_or_create!(name: t['artist']['name'], image: t['artist']['image'][3]['#text'])
					track = Track.where('lower(title) = lower(?) and artist_id = ?', t['name'], artist.id).first_or_create!(title: t['name'], artist_id: artist.id)
  					album = Album.where('lower(title) = lower(?) and artist_id = ?', t['album']['#text'], artist.id).first_or_create(title: t['album']['#text'], artist_id: artist.id, cover: t['image'][3]['#text'])

  					profile_artist = ProfileArtist.where(artist_id: artist.id, profile_id: profile.id).first_or_create!(created_at: Time.at(t['date']['uts'].to_i))
          			profile_album = ProfileAlbum.where(album_id: album.id, profile_id: profile.id).first_or_create(created_at: Time.at(t['date']['uts'].to_i), profile_artist_id: profile_artist.id, artist_id: artist.id) if album
  					profile_track = ProfileTrack.where(track_id: track.id, profile_id: profile.id).first_or_create!(created_at: Time.at(t['date']['uts'].to_i), loved: t['loved'].to_i, profile_artist_id: profile_artist.id, artist_id: artist.id)
  					
          			if album && !profile_track.albums.include?(album.id)
            			profile_track.albums << album.id
            			profile_track.save
          			end
          			if profile_album && !profile_track.profile_albums.include?(profile_album.id)
            			profile_track.profile_albums << profile_album.id
            			profile_track.save
          			end

          			play = Play.where(profile_id: profile.id, 
                      	track_id: track.id, 
                      	profile_track_id: profile_track.id, 
                      	album_id: (album ? album.id : nil), 
                      	profile_album_id: (profile_album ? profile_album.id : nil),
                      	artist_id: artist.id,
                      	profile_artist_id: profile_artist.id,
                      	created_at: Time.at(t['date']['uts'].to_i))

          			unless play.present?
          				play.first_or_create!
	          			profile_artist.count += 1
	          			profile_artist.save
	          			if profile_album
		          			profile_album.count += 1
		          			profile_album.save
		          		end
	          			profile_track.count += 1
	          			profile_track.save
	          		end
	          	else
	          		recent_tracks_paging = false
				end
			end
			i += 1
		end

		new_artists = ProfileArtist.where('created_at > ?', profile.profile_artists.last.created_at)
		new_artists.map do |a|
			similars = JSON.parse(open("http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=#{CGI.escape(a.artist.name)}&limit=50&api_key=#{ENV["LASTFM_KEY"]}&format=json").read)['similarartists']['artist']
          	similars.map do |s|
          		rec = Recommendation.where(profile_id: profile_id, artist_name: s['name']).first_or_create!(image: s['image'][2]['#text'])
          		rec.profile_artists << a.id unless rec.profile_artists.include?(a.id)
          		rec.save!
          		unless rec.tags.any?
	          		tags = JSON.parse(open("http://ws.audioscrobbler.com/2.0/?method=artist.gettoptags&artist=#{CGI.escape(rec.artist_name)}&api_key=#{ENV["LASTFM_KEY"]}&format=json").read)['toptags']['tag']
	          		tags.first(10).map do |t|
	            		tag = Tag.where(name: t['name']).first_or_create!(name: t['name'])
	            		rec.tags << tag.id unless rec.tags.include?(tag.id)
	            		rec.save
	            	end
          		end
        	end
        end
	end
end