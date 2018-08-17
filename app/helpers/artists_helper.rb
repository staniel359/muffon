module ArtistsHelper
  def width_of(track)
    (track.lastfm_plays_count * 67).fdiv(top_track_count)
  end

private

  def top_track_count
    @top_track_count ||= @artist.top_track_plays_count
  end
end
