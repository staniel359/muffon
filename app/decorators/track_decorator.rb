class TrackDecorator < Draper::Decorator
  delegate_all

  def artist_name
    artist.name
  end

  def image
    artist.decorate.image
  end
end
