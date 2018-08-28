class ProfileArtistDecorator < Draper::Decorator
  delegate_all

  def name
    artist.name
  end

  def image
    artist.decorate.image
  end

  def in_playlist?
    profile_track_ids.length == playlist_track_ids.length
  end
end
