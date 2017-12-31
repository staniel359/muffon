module Library
  class ArtistTracks < Service
    def call
      process_tracks
    end

  private

    def process_tracks
      tracks.joins(:track, :artist).select(
        '*,
        profile_tracks.id as id,
        tracks.id as track_id,
        profile_tracks.profile_artist_id as profile_artist_id,
        artists.id as artist_id,
        tracks.title as title'
      )
    end

    def tracks
      ProfileArtist.find(@args.id).profile_tracks
    end
  end
end
