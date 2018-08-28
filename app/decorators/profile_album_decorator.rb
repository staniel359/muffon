class ProfileAlbumDecorator < Draper::Decorator
  delegate_all

  def artist_name
    artist.name
  end

  def title
    album.title
  end

  def cover
    album.decorate.cover
  end

  def profile_tracks
    ProfileTrack.where(id: profile_track_ids)
  end

  def in_playlist?
    profile_track_ids.length == playlist_track_ids.length
  end
end
