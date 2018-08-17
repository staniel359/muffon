class ProfileArtistDecorator < Draper::Decorator
  delegate_all

  def name
    artist.name
  end

  def image
    artist.decorate.image
  end
end
