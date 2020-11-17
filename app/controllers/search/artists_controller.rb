module Search
  class ArtistsController < SearchController
    def index
      set_artists
      set_current_artist_ids
      set_profile_instances
      respond_with_js_and_html
    end

  private

    def set_artists
      @artists = paginate_array(artists_data, 1000, 20)
    end

    def artists_data
      @artists_data ||= Muffon::Processor::Search::Model.call(
        params.slice(:q, :page).merge(model: 'artist')
      )
    end
  end
end
