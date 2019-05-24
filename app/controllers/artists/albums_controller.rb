module Artists
  class AlbumsController < ArtistsController
    before_action :set_artist, :check_correct_artist

    def index
      set_title
      set_albums
    end

    def show
      process_album
      check_correct_album
      set_title
    end

    def tags
      set_album
      check_correct_album
      set_title
      set_tags
    end

    def wiki
      set_album
      check_correct_album
      set_title
    end

  private

    def process_album
      @album = Muffon::Processor::Album.call(
        params.slice(:artist_name, :album_title)
      )&.decorate
    end

    def set_album
      (find_album || process_album)
    end

    def find_album
      @album = Album.with(
        title: params[:album_title],
        artist_id: @artist.id
      ).first&.decorate
    end

    def set_title
      @title = t(
        "artists.albums.#{params[:action]}",
        artist: @artist&.name,
        album: @album&.title
      )
    end

    def set_albums
      @albums = paginate_array(processed_albums, 400, 20)

      redirect_to artists_albums_path if @albums.empty?
    end

    def processed_albums
      Muffon::Processor::Albums.call(
        params.slice(:artist_name, :page)
      )
    end

    def set_albums_artist
      @artist = @albums.first.artist
    end

    def set_tags
      @tags = LastFM::Tags.call(
        params.slice(
          :artist_name, :album_title
        ).merge!(model_name: 'album')
      )
    end
  end
end
