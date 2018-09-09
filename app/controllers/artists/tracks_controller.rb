module Artists
  class TracksController < ArtistsController
    before_action :set_artist, :check_correct_artist

    def index
      set_tracks
      set_title
    end

  private

    def set_title
      @title = t(
        "artists.tracks.#{params[:action]}",
        artist: @artist.name
      )
    end

    def set_tracks
      @tracks = paginate_array(processed_tracks, 1000, 50)

      redirect_to artists_tracks_path if @tracks.empty?
    end

    def processed_tracks
      Muffon::Processor::Tracks.call(
        params.slice(:artist_name, :page)
      )
    end
  end
end
