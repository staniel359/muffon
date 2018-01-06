class ArtistsController < ApplicationController
  include ArtistsHelper
  before_action :set_artist
  before_action :set_album, only: %i[album album_tags]

  def show
    @title = @artist.name
    @tags = @artist.artist_tags
    @taggings = @artist.profile_taggings(current_profile.id)
    @description = @artist.description.split(
      '<a href="https://www.last.fm/music/'
    )[0]&.html_safe
    @tracks = @artist.artist_top_tracks
    @albums = @artist.artist_top_albums
    @similars = @artist.similar_artists

    ArtistUpdateJob.perform_later(@artist.name)
  end

  def images
    @title = "#{@artist.name} - Images"
    @images = set_images
  end

  def tracks
    @title = "#{@artist.name} - Tracks"
    @tracks = paginate(set_tracks, 50, 10_000)

    redirect_to artist_tracks_path if @tracks.empty?
  end

  def albums
    @title = "#{@artist.name} - Albums"
    @albums = paginate(set_albums, 20, 1000)

    redirect_to artist_albums_path if @albums.empty?
  end

  def album
    @title = "#{@album.artist.name} - #{@album.title}"
    @tags = @album.album_tags
  end

  def album_tags
    @title = "#{@album.artist.name} - #{@album.title}"
    set_album_tags
    @tags = @album.album_tags
  end

  def similar_artists
    @title = "#{@artist.name} - Similar artists"
    @similar_artists = paginate(process_similars, 15, 200)

    redirect_to artist_similar_artists_path if @similar_artists.empty?
  end

  def wiki
    @title = "#{@artist.name} - Wiki"
    @description = @artist.description.split('<a href')[0]&.html_safe
  end

  def tags
    @title = "#{@artist.name} - Tags"
    set_artist_tags
    @tags = @artist.artist_tags
  end

  def listeners
    @title = "#{@artist.name} - Listeners"
    @listeners = @artist.profiles.page(params[:page]).per(50)
  end

  def plays
    @title = "#{@artist.name} - Plays"
    @plays = @artist.plays.page(params[:page]).per(50)
  end

private

  def set_artist
    artist = Artist.find_by(name: params[:name])
    @artist ||= artist&.full? ? artist : process_artist(params[:name], true)
  end

  def process_artist(name, full)
    Lastfm::Artist::Processor.call(name: name, full: full)
  end

  def paginate(collection, per, total)
    Kaminari.paginate_array(
      collection, total_count: total
    ).page(params[:page]).per(per)
  end

  def set_images
    Lastfm::Artist::Images.call(
      name: params[:name], page: params[:page]
    )
  end

  def set_tracks
    Lastfm::Artist::Tracks.call(
      name: params[:name], page: params[:page], limit: 50
    )
  end

  def set_albums
    Lastfm::Artist::Albums.call(
      name: params[:name], page: params[:page], limit: 20
    )
  end

  def set_album
    album = Album.find_by(
      title: params[:title], artist_id: @artist.id
    )
    @album = album&.full? ? album : process_album
  end

  def process_album
    Lastfm::Album::Processor.call(
      artist_name: params[:name], album_title: params[:title]
    )
  end

  def process_similars
    artist_similars.map do |similar|
      artist = Artist.find_by(name: similar['name'])
      next artist if artist&.full?
      process_artist(similar['name'], nil)
    end
  end

  def artist_similars
    Lastfm::Artist::SimilarArtists.call(
      name: params[:name], page: params[:page]
    )
  end

  def set_artist_tags
    @artist.tags = Lastfm::Artist::Tags.call(name: @artist.name)
  end

  def set_album_tags
    @album.tags = Lastfm::Album::Tags.call(
      artist_name: @artist.name, album_title: @album.title
    )
  end
end
