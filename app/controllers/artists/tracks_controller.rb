module Artists
  class TracksController < ApplicationController
    before_action :set_artist, :set_title

    def index
      @pagy, @tracks = tracks
    end

  private

    def set_artist
      @artist = Muffon::Processor::Artist.call(
        params.slice(:artist_name)
      )
    end

    def set_title
      @title = t(
        "artists.tracks.#{params[:action]}",
        artist: @artist.name
      )
    end

    def tracks
      pagy_dynamic_array(processed_tracks, 1000, 50)
    end

    def processed_tracks
      Muffon::Processor::Tracks.call(
        tracks:    tracks_data,
        artist_id: @artist.id
      )
    end

    def tracks_data
      LastFM::Artist::Tracks.call(
        params.slice(:artist_name, :page)
      )
    end
  end
end
