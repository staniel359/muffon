module Search
  class AlbumsController < SearchController
    def index
      set_albums
      respond_with_js_and_html
    end

  private

    def set_albums
      @albums = paginate_array(albums_data, 1000, 20)
    end

    def albums_data
      @albums_data ||= Muffon::Processor::Search::Model.call(
        params.slice(:q, :page).merge(model: 'album')
      )
    end
  end
end
