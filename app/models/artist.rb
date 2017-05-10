class Artist < ApplicationRecord
	has_many :profile_artists

	def in_library?(name, profile)
		if artist = self.find_by(name: name)
			if profile_artist = @profile.profile_artists.find_by(artist_id: artist.id)
				true
			end
		end
	end
end
