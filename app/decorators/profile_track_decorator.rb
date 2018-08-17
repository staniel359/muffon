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
end
