module ArtistsHelper
  def width_of(track)
    track.playcount.to_f * 68.0 / top_track_count
  end

  def name(name)
    name.include?('/') ? CGI.escape(name) : name
  end

  def artist_image(image)
    image.present? ? image : 'missing_artist.png'
  end

  def album_cover(cover)
    cover.present? ? cover : 'missing_album.png'
  end

private

  def top_track_count
    @top_track_count ||= @artist.top_track_count
  end
end
