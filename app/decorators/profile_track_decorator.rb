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

  def in_playlist?(track_ids)
    id.in?(track_ids)
  end
end
