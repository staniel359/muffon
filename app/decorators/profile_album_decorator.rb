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

  def profile_tracks
    ProfileTrack.where(id: profile_track_ids)
  end

  def in_playlist?(album_ids)
    profile_track_ids.length ==
      album_ids.select { |id| object.id == id }.length
  end

  def taggings
    album.taggings
  end
end
