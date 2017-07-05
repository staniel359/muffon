class GetTracksJob < ApplicationJob
	queue_as :default

  	def perform(profile_id)
  		profile = Profile.find_by(id: profile_id)

  		# Total entries count

  		recent_tracks_total = JSON.parse(open("http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=#{profile.lastfm_id}&api_key=#{ENV["LASTFM_KEY"]}&format=json").read)['recenttracks']['@attr']['total'].to_i
      top_tags_total = JSON.parse(open("http://ws.audioscrobbler.com/2.0/?method=user.gettoptags&limit=1000&user=#{profile.lastfm_id}&api_key=#{ENV["LASTFM_KEY"]}&format=json").read)['toptags']['tag'].length

  		entries_total = (recent_tracks_total + top_tags_total).to_f

  		# Recent tracks import

      recent_tracks_counter = 0
    	ActionCable.server.broadcast "tracks_import_#{profile_id}", { id: profile_id, t: recent_tracks_total, p: 1, c: recent_tracks_counter }
    	@counter = 0

    	recent_tracks_pages = JSON.parse(open("http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=#{profile.lastfm_id}&limit=200&api_key=#{ENV["LASTFM_KEY"]}&format=json").read)['recenttracks']['@attr']['totalPages'].to_i
  		recent_tracks_pages.downto(1) do |i|
  			recent_tracks = JSON.parse(open("http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=#{profile.lastfm_id}&extended=1&limit=200&page=#{i}&api_key=#{ENV["LASTFM_KEY"]}&format=json").read)['recenttracks']['track']
  			recent_tracks.reverse.map do |t|
  				artist = Artist.where('lower(name) = lower(?)', t['artist']['name']).first_or_create!(name: t['artist']['name'], image: t['artist']['image'][3]['#text'])
  				track = Track.where('lower(title) = lower(?) and artist_id = ?', t['name'], artist.id).first_or_create!(title: t['name'], artist_id: artist.id)
  				album = Album.where('lower(title) = lower(?) and artist_id = ?', t['album']['#text'], artist.id).first_or_create(title: t['album']['#text'], artist_id: artist.id, cover: t['image'][3]['#text'])
          
  				profile_artist = ProfileArtist.where(artist_id: artist.id, profile: profile.id).first_or_create!(created_at: Time.at(t['date']['uts'].to_i))
          profile_album = ProfileAlbum.where(album_id: album.id, profile: profile.id).first_or_create(created_at: Time.at(t['date']['uts'].to_i), profile_artist_id: profile_artist.id, artist_id: artist.id) if album
  				profile_track = ProfileTrack.where(track_id: track.id, profile: profile.id).first_or_create!(created_at: Time.at(t['date']['uts'].to_i), loved: t['loved'].to_i, profile_artist_id: profile_artist.id, artist_id: artist.id)
          if album && !profile_track.albums.include?(album.id)
            profile_track.albums << album.id
            profile_track.save
          end
          if profile_album && !profile_track.profile_albums.include?(profile_album.id)
            profile_track.profile_albums << profile_album.id
            profile_track.save
          end

  				Play.where(profile_id: profile.id, 
                      track_id: track.id, 
                      profile_track_id: profile_track.id, 
                      album_id: (album ? album.id : nil), 
                      profile_album_id: (profile_album ? profile_album.id : nil),
                      artist_id: artist.id,
                      profile_artist_id: profile_artist.id,
                      created_at: Time.at(t['date']['uts'].to_i)).first_or_create!

  				@counter += 1
          recent_tracks_counter += 1
  				width = (@counter / entries_total * 100)
  				ActionCable.server.broadcast "tracks_import_#{profile_id}", { id: profile_id, p: 1, t: recent_tracks_total, c: recent_tracks_counter, w: width }
  			end
  		end

      # Top tags

      tag_counter = 0
      ActionCable.server.broadcast "tracks_import_#{profile_id}", { id: profile_id, t: top_tags_total, p: 2, c: tag_counter }

      top_tags = JSON.parse(open("http://ws.audioscrobbler.com/2.0/?method=user.gettoptags&limit=1000&user=#{profile.lastfm_id}&api_key=#{ENV["LASTFM_KEY"]}&format=json").read)['toptags']['tag']

      if top_tags.any?
        top_tags.map do |t|
          tag = Tag.where(name: t['name']).first_or_create!(name: t['name'].downcase)
          ProfileTag.where(profile: profile_id, tag_id: tag.id).first_or_create!(count: t['count'])

          @counter += 1
          tag_counter += 1
          width = (@counter / entries_total * 100)
          ActionCable.server.broadcast "tracks_import_#{profile_id}", { id: profile_id, p: 2, t: top_tags_total, c: tag_counter, w: width }
        end
      end

      # Recommendations

      ActionCable.server.broadcast "tracks_import_#{profile_id}", { id: profile_id, p: 3}
      rec_total = profile.profile_artists.count.to_f
      rec_counter = 0

      profile.profile_artists.order(count: :desc).map do |a|
        similars = JSON.parse(open("http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=#{CGI.escape(a.artist.name)}&limit=50&api_key=#{ENV["LASTFM_KEY"]}&format=json").read)['similarartists']['artist']
        similars.map do |s|
          rec = Recommendation.where(profile_id: profile_id, artist_name: s['name']).first_or_create!(image: s['image'][2]['#text'])
          rec.profile_artists << a.id unless rec.profile_artists.include?(a.id)
          rec.save!
          tags = JSON.parse(open("http://ws.audioscrobbler.com/2.0/?method=artist.gettoptags&artist=#{CGI.escape(rec.artist_name)}&api_key=#{ENV["LASTFM_KEY"]}&format=json").read)['toptags']['tag']
          tags.first(10).map do |t|
            tag = Tag.where(name: t['name']).first_or_create!(name: t['name'].downcase)
            rec.tags << tag.id unless rec.tags.include?(tag.id)
            rec.save
          end
        end
        rec_counter += 1
        width = (rec_counter / rec_total) * 100
        ActionCable.server.broadcast "tracks_import_#{profile_id}", { id: profile_id, p: 3, w: width }
      end
      ActionCable.server.broadcast "tracks_import_#{profile_id}", { id: profile_id, close: 1 }
	  end

end
