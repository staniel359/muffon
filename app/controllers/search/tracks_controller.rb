module Search
  class TracksController < SearchController
    def index
      set_tracks
      respond_with_js_and_html
    end

  private

    def set_tracks
      @tracks = paginate_array(tracks_data, 1000, 20)
    end

    def tracks_data
      @tracks_data ||= Muffon::Processor::Search::Model.call(
        params.slice(:q, :page).merge(model: 'track')
      )
    end
  end
end
