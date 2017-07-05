module ProfilesHelper

	def get_scoped_artists(scope)
		if ((scope == 0) || (scope == nil))
			@top_artists = @profile.profile_artists.joins(:plays).group('profile_artists.id').order('count(profile_artists.id) desc').limit(8)
		else
			@top_artists = @profile.profile_artists.joins(:plays).where('plays.created_at > ?', scope.to_i.days.ago).group('profile_artists.id').order('count(profile_artists.id) desc').limit(8)
		end
	end

	def count_artist_plays(profile_artist)
		if (params[:artists_scope] && params[:artists_scope] != '0')
			profile_artist.plays.where('plays.created_at > ?', params[:artists_scope].to_i.days.ago).count
		elsif (params[:artists_default_scope] && params[:artists_default_scope] != '0')
			profile_artist.plays.where('plays.created_at > ?', params[:artists_default_scope].to_i.days.ago).count
		else
			profile_artist.plays.count
		end
	end

	def get_scoped_albums(scope)
		if ((scope == 0) || (scope == nil))
			@top_albums = @profile.profile_albums.joins(:plays).group('profile_albums.id').order('count(profile_albums.id) desc').limit(4)
		else
			@top_albums = @profile.profile_albums.joins(:plays).where('plays.created_at > ?', scope.to_i.days.ago).group('profile_albums.id').order('count(profile_albums.id) desc').limit(4)
		end
	end

	def count_album_plays(profile_album)
		if (params[:albums_scope] && params[:albums_scope] != '0')
			profile_album.plays.where('plays.created_at > ?', params[:albums_scope].to_i.days.ago).count
		elsif (params[:albums_default_scope] && params[:albums_default_scope] != '0')
			profile_album.plays.where('plays.created_at > ?', params[:albums_default_scope].to_i.days.ago).count
		else
			profile_album.plays.count
		end
	end

	def get_common_artists
		@common_artists = (current_profile.profile_artists.map(&:artist_id) & @profile.profile_artists.map(&:artist_id)).map {|a| Artist.find(a).profile_artists.find_by(profile_id: @profile.id)}.sort_by(&:count).reverse
	end

end
