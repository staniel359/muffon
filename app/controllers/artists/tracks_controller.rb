module Artists
  class TracksController < ApplicationController
    def index
      @page_data = {
        title:  title,
        tracks: tracks
      }
    end

  private

    def title
      t(
        "artists.tracks.#{params[:action]}",
        artist: artist.artist.name
      )
    end

    def artist
      Muffon::Processor::Artist.call(params.slice(:artist_name))
    end

    def tracks
      paginate(
        paginate_array(
          tracks_data[:data],
          tracks_data[:total_count]
        ), 50
      )
    end

    def tracks_data
      @tracks_data ||= Lastfm::Artist::Tracks.call(
        params.slice(:artist_name, :page)
      )
    end

    def set_track
      @track = Track.find_by(id: params[:track_id])
    end
  end
end
