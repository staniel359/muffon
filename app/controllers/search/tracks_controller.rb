module Search
  class TracksController < SearchController
    def index
      set_tracks
      respond_with_js_and_html
    end

  private

    def set_tracks
      @tracks = paginate_array(
        tracks_data[:data], tracks_data[:total_count], 20
      )
    end

    def tracks_data
      @tracks_data ||= Muffon::Processor::Search::Tracks.call(
        params.slice(:q, :page)
      )
    end
  end
end
