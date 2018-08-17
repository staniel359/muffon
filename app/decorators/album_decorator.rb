class AlbumDecorator < Draper::Decorator
  delegate_all

  def cover
    object.cover || 'missing_album.png'
  end
end
