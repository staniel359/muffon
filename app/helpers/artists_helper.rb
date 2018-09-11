module ArtistsHelper
  def width_of(track)
    (track.lastfm_plays_count * 67).fdiv(top_track_count)
  end

private

  def top_track_count
    @top_track_count ||= @artist.tracks.order(
      lastfm_plays_count: :desc
    ).first.lastfm_plays_count
  end
end
