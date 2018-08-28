class BookmarkDecorator < Draper::Decorator
  delegate_all

  def artist_name
    bookmarkable.decorate.name
  end

  def artist_image
    bookmarkable.decorate.image
  end
end
