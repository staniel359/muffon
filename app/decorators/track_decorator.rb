class TrackDecorator < Draper::Decorator
  delegate_all

  def artist_name
    artist.name
  end

  def image
    artist.image
  end
end
