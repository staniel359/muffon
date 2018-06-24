module Artists
  class AlbumsController < ApplicationController
    def index
      @page_data = {
        title:  title,
        albums: albums
      }
    end

    def show
      @page_data = {
        title: title,
        album: album
      }
    end

    def tags
      @page_data = {
        title: title,
        album: album,
        tags:  retrieve_tags
      }
    end

    def wiki
      @page_data = {
        title: title,
        album: album
      }
    end

  private

    def title
      t(
        "artists.albums.#{params[:action]}",
        profile: profile.nickname,
        artist:  artist.name,
        album:   album&.title
      )
    end

    def album
      @album ||= Muffon::Processor::Album.call(
        params.slice(:artist_name, :album_title)
      )
    end

    def albums
      paginate(
        paginate_array(
          albums_data[:data],
          albums_data[:total_count]
        ), 20
      )
    end

    def albums_data
      @albums_data ||= Lastfm::Artist::Albums.call(
        params.slice(:artist_name, :page).merge!(limit: 20)
      )
    end

    def retrieve_tags
      Lastfm::Tags.call(
        params.slice(:artist_name, :album_title).merge!(
          model_name: 'album'
        )
      )
    end
  end
end
