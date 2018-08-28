class ProfileTrackDecorator < Draper::Decorator
  delegate_all

  def artist_name
    artist.name
  end

  def title
    track.title
  end

  def image
    artist.decorate.image
  end

  def profile_albums
    ProfileAlbum.where(id: profile_album_ids)
  end

  def in_playlist?(playlist_id)
    PlaylistTrack.find_by(
      playlist_id: playlist_id,
      track_id:    track_id
    )
  end
end
