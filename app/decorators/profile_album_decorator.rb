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
end
