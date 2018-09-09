class ProfileArtistDecorator < Draper::Decorator
  delegate_all

  def name
    artist.name
  end

  def image
    artist.decorate.image
  end

  def in_playlist?(artist_ids)
    profile_track_ids.length ==
      artist_ids.select { |id| object.id == id }.length
  end

  def taggings
    artist.taggings
  end
end
