module Library
  class AlbumTracks < Service
    def call
      process_tracks
    end

  private

    def process_tracks
      tracks.joins(:track).select(
        '*,
        profile_tracks.id as id,
        tracks.title as title'
      )
    end

    def tracks
      ProfileAlbum.find(@args.id).tracks
    end
  end
end
