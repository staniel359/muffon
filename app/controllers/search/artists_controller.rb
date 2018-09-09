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
      @artists = paginate_array(
        artists_data[:data], artists_data[:total_count], 20
      )
    end

    def artists_data
      @artists_data ||= Muffon::Processor::Search::Artists.call(
        params.slice(:q, :page)
      )
    end
  end
end
