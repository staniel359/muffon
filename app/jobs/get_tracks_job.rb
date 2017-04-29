class GetTracksJob < ApplicationJob
  queue_as :default

  def perform(profile)
    pages = JSON.parse(open("http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=#{profile.lastfm_id}&limit=200&api_key=fb914bd85f85f89d750e93c8bfb70012&format=json").read)['recenttracks']['@attr']['totalPages'].to_i
		pages.downto(1) do |i|
			tracks = JSON.parse(open("http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=#{profile.lastfm_id}&extended=1&limit=200&page=#{i}&api_key=fb914bd85f85f89d750e93c8bfb70012&format=json").read)
			tracks['recenttracks']['track'].reverse.map do |t|
				artist = Artist.where(name: t['artist']['name']).first_or_create!
				track = Track.where(title: t['name'], artist: artist.id).first_or_create!
				album = Album.where(title: t['album']['#text'], artist: artist.id).first_or_create!(cover: t['image'][0]['#text'])
				ProfileArtist.where(artist_id: artist.id, profile: profile.id).first_or_create!
				profile_track = ProfileTrack.where(track_id: track.id, album_id: album.id, profile: profile.id).first_or_create!(created_at: t['date']['#text'], loved: t['loved'].to_i)
				ProfileAlbum.where(album_id: album.id, profile: profile.id).first_or_create!
				Play.create!(profile_id: profile.id, profile_track_id: profile_track.id, created_at: t['date']['#text'])
			end
		end
	end
end
