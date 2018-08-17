class ArtistsController < ApplicationController
  before_action :set_artist, :set_title

  def show; end

  def images
    @images = artist_images
  end

  def tags
    @tags = artist_tags
  end

  def wiki; end

  def similar_artists
    @page_data = {
      title:           title,
      similar_artists: retrieve_similar_artists
    }
  end

  def listeners
    @listeners = artist_listeners
  end

  def plays
    @plays = artist_plays
  end

private

  def set_artist
    @artist = Muffon::Processor::Artist.call(
      params.slice(:artist_name)
    ).decorate
  end

  def set_title
    @title = t(
      "artists.#{params[:action]}",
      artist: @artist.name
    )
  end

  def artist_images
    paginate(
      paginate_array(
        images_data[:data],
        images_data[:total_count]
      ), 40
    )
  end

  def images_data
    @images_data ||= LastFM::Artist::Images.call(
      params.slice(:artist_name, :page)
    )
  end

  def retrieve_similar_artists
    paginate_array(similar_artists_data, 200)
  end

  def similar_artists_data
    LastFM::Artist::SimilarArtists.call(
      params.slice(:artist_name, :page)
    )
  end

  def artist_tags
    LastFM::Tags.call(
      params.slice(:artist_name).merge!(
        model_name: 'artist'
      )
    )
  end

  def artist_listeners
    paginate(@artist.listeners.created_desc, 50)
  end

  def artist_plays
    paginate(@artist.plays.created_desc, 50)
  end
end
