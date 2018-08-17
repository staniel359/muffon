class PlayDecorator < Draper::Decorator
  delegate_all

  def artist_name
    artist.name
  end

  def track_title
    track.title
  end

  def album_title
    album&.title
  end

  def album_cover
    album&.decorate.cover
  end
end
