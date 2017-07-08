class Artist < ApplicationRecord
	has_many :profile_artists
	has_many :loved_tracks
	validates :name, presence: true

	def in_library?(name, profile)
		artist = self.find_by(name: name)
		if artist
			if profile.profile_artists.find_by(artist_id: artist.id)
				true
			end
		end
	end
end
