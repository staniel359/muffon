class PlaylistTrackDecorator < Draper::Decorator
  delegate_all

  def artist_name
    artist.name
  end

  def title
    track.title
  end

  def cover
    album.decorate.cover
  end

  def image
    artist.decorate.image
  end

  def album_title
    album.title
  end
end
