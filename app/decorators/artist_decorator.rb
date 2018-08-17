class ArtistDecorator < Draper::Decorator
  delegate_all

  def image
    object.image || 'missing_artist.png'
  end

  def top_tags
    Tag.find(tag_ids)
  end

  def top_tracks
    Track.find(top_track_ids)
  end

  def top_albums
    Album.find(top_album_ids)
  end

  def similar_artists
    Artist.find(similar_artist_ids)
  end
end
