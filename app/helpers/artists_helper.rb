module ArtistsHelper
  def width_of(track)
    track['playcount'].to_f * 70.0 / top_track_count
  end

private

  def top_track_count
    @artist.top_track_count
  end
end
