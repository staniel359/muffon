module Artists
  class AlbumsController < ApplicationController
    before_action :set_artist, :check_correct_artist
    before_action :set_album, :check_correct_album, except: :index
    before_action :set_title

    def index
      @pagy, @albums = albums
    end

    def show; end

    def tags
      @tags = album_tags
    end

    def wiki; end

  private

    def set_artist
      @artist = Muffon::Processor::Artist.call(
        params.slice(:artist_name)
      )
    end

    def set_title
      @title = t(
        "artists.albums.#{params[:action]}",
        artist:  @artist&.name,
        album:   @album&.title
      )
    end

    def set_album
      @album = Muffon::Processor::Album.call(
        params.slice(:artist_name, :album_title)
      )&.decorate
    end

    def albums
      pagy_dynamic_array(processed_albums, 400, 20)
    end

    def processed_albums
      Muffon::Processor::Albums.call(
        albums:    albums_data,
        artist_id: @artist.id
      )
    end

    def albums_data
      LastFM::Artist::Albums.call(
        params.slice(:artist_name, :page)
      )
    end

    def album_tags
      LastFM::Tags.call(
        params.slice(:artist_name, :album_title).merge!(
          model_name: 'album'
        )
      )
    end
  end
end
