class ArtistsController < ApplicationController
  include ArtistsHelper
  before_action :set_artist

  def show
    @title = @artist.name
    @taggings = artist_taggings
    @tracks = artist_tracks(10)
    @albums = artist_albums(4)
    @similars = @artist.similar_artists

    @artist.update(
      top_track_count: @tracks.first['playcount'].to_i
    )

    # ArtistUpdateJob.perform_later(artist_name)
  end

  def tracks
    @title = "#{@artist.name} - Tracks"
    @tracks = Kaminari.paginate_array(
      artist_tracks(20).last(20), total_count: 10_000
    ).page(params[:page]).per(20)

    redirect_to artist_tracks_path if @tracks.empty?
  end

  def albums
    @title = "#{@artist.name} - Albums"
    @albums = Kaminari.paginate_array(
      artist_albums(20), total_count: 1000
    ).page(params[:page]).per(20)

    redirect_to artist_albums_path if @albums.empty?
  end

  def album
    @album = present_album&.full? ? present_album : new_album
    @title = "#{@album.artist.name} - #{@album.title}"
  end

  def similar_artists
    @title = "#{@artist.name} - Similar artists"
    @similar_artists = Kaminari.paginate_array(
      artist_similars(15), total_count: 200
    ).page(params[:page]).per(15)

    redirect_to artist_similar_artists_path if @similar_artists.empty?
  end

private

  def set_artist
    # @artist ||= Artist.find_by(name: params[:name])

    # return @artist if @artist&.info_status == 'full'

    @artist ||= process_artist(params[:name], 'full')
  end

  def process_artist(name, type)
    Lastfm::Artist::Processor.call(
      name: name, type: type
    )
  end

  def artist_taggings
    current_profile.taggings.where(
      model_type: 'Artist',
      model_id: @artist.id
    )
  end

  def artist_tracks(limit)
    Lastfm::Artist::Tracks.call(
      name: params[:name],
      page: params[:page], limit: limit
    )
  end

  def artist_albums(limit)
    Lastfm::Artist::Albums.call(
      name: params[:name],
      page: params[:page], limit: limit
    )
  end

  def present_album
    @present_album ||= Album.find_by(
      title: params[:title],
      artist_id: @artist.id
    )
  end

  def new_album
    Lastfm::Album::Processor.call(
      artist_name: params[:name],
      title: params[:title]
    )
  end

  def artist_similars(limit)
    Lastfm::Artist::SimilarArtists.call(
      name: params[:name],
      page: params[:page], limit: limit
    ).map do |similar|
      artist = Artist.where(name: similar['name']).first_or_create
      next artist unless artist&.info_status == 'none'

      process_artist(similar['name'], 'base')
    end
  end
end
