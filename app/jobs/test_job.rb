class TestJob < ApplicationJob
  queue_as :default

	def perform(profile_id)
		profile = Profile.find(profile_id)

		loved_tracks_pages = JSON.parse(open("http://ws.audioscrobbler.com/2.0/?method=user.getlovedtracks&user=#{profile.lastfm_id}&limit=200&api_key=#{ENV["LASTFM_KEY"]}&format=json").read)['lovedtracks']['@attr']['totalPages'].to_i
     	loved_tracks_pages.downto(1) do |i|
        	loved_tracks = JSON.parse(open("http://ws.audioscrobbler.com/2.0/?method=user.getlovedtracks&user=#{profile.lastfm_id}&limit=200&page=#{i}&api_key=#{ENV["LASTFM_KEY"]}&format=json").read)['lovedtracks']['track']
        	loved_tracks.each do |t|
          		artist = Artist.find_by('lower(name) = lower(?)', t['artist']['name'])
		        track = Track.find_by('lower(title) = lower(?) and artist_id = ?', t['name'], artist.id)
		        profile_artist = profile.profile_artists.find_by(artist_id: artist.id)
		        profile_track = profile.profile_tracks.find_by(track_id: track.id)
		        LovedTrack.where(track_id: track.id, profile_id: profile_id).first_or_create!(profile_track_id: profile_track.id, artist_id: artist.id, profile_artist_id: profile_artist.id, created_at: Time.at(t['date']['uts'].to_i))
        	end
      	end
	end


end
