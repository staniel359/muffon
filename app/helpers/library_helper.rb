module LibraryHelper
  def library_width_of(track)
    track.plays_count.to_f * 70.0 / profile_top_track_count
  end

private

  def profile_top_track_count
    @profile_top_track_count ||=
      @profile.profile_tracks.first.plays_count
  end
end
