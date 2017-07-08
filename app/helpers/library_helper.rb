module LibraryHelper
  def get_scoped_artists(scope)
    if scope.zero? || scope.nil?
      @top_artists = @profile.profile_artists.joins(:plays).group('profile_artists.id').order('count(profile_artists.id) desc').limit(8)
    else
      @top_artists = @profile.profile_artists.joins(:plays).where('plays.created_at > ?', scope.to_i.days.ago).group('profile_artists.id').order('count(profile_artists.id) desc').limit(8)
    end
  end

  def count_artist_plays(profile_artist)
    if params[:artists_scope]
      if params[:artists_scope] == '0'
        profile_artist.plays.count
      else
        profile_artist.plays.where('plays.created_at > ?', params[:artists_scope].to_i.days.ago).count
      end
    elsif params[:artists_default_scope]
      if params[:artists_default_scope] == '0'
        profile_artist.plays.count
      else
        profile_artist.plays.where('plays.created_at > ?', params[:artists_default_scope].to_i.days.ago).count
      end
    elsif @profile.top_artists_scope
      if @profile.top_artists_scope.zero?
        profile_artist.plays.count
      else
        profile_artist.plays.where('plays.created_at > ?', @profile.top_artists_scope.days.ago).count
      end
    else
      profile_artist.plays.count
    end
  end

  def get_scoped_albums(scope)
    if scope.zero? || scope.nil?
      @top_albums = @profile.profile_albums.joins(:plays).group('profile_albums.id').order('count(profile_albums.id) desc').limit(4)
    else
      @top_albums = @profile.profile_albums.joins(:plays).where('plays.created_at > ?', scope.to_i.days.ago).group('profile_albums.id').order('count(profile_albums.id) desc').limit(4)
    end
  end

  def count_album_plays(profile_album)
    if params[:albums_scope]
      if params[:albums_scope] == '0'
        profile_album.plays.count
      else
        profile_album.plays.where('plays.created_at > ?', params[:albums_scope].to_i.days.ago).count
      end
    elsif params[:albums_default_scope]
      if params[:albums_default_scope] == '0'
        profile_album.plays.count
      else
        profile_album.plays.where('plays.created_at > ?', params[:albums_default_scope].to_i.days.ago).count
      end
    elsif @profile.top_albums_scope
      if @profile.top_albums_scope.zero?
        profile_album.plays.count
      else
        profile_album.plays.where('plays.created_at > ?', @profile.top_albums_scope.days.ago).count
      end
    else
      profile_album.plays.count
    end
  end

  def get_scoped_tracks(scope)
    if scope.zero? || scope.nil?
      @top_tracks = @profile.profile_tracks.joins(:plays).group('profile_tracks.id').order('count(profile_tracks.id) desc').limit(8)
    else
      @top_tracks = @profile.profile_tracks.joins(:plays).where('plays.created_at > ?', scope.to_i.days.ago).group('profile_tracks.id').order('count(profile_tracks.id) desc').limit(8)
    end
  end

  def count_track_plays(profile_track)
    if params[:tracks_scope]
      if params[:tracks_scope] == '0'
        profile_track.plays.count
      else
        profile_track.plays.where('plays.created_at > ?', params[:tracks_scope].to_i.days.ago).count
      end
    elsif params[:tracks_default_scope]
      if params[:tracks_default_scope] == '0'
        profile_track.plays.count
      else
        profile_track.plays.where('plays.created_at > ?', params[:tracks_default_scope].to_i.days.ago).count
      end
    elsif @profile.top_tracks_scope
      if @profile.top_tracks_scope.zero?
        profile_track.plays.count
      else
        profile_track.plays.where('plays.created_at > ?', @profile.top_tracks_scope.days.ago).count
      end
    else
      profile_track.plays.count
    end
  end
end
