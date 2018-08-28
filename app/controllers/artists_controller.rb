class ArtistsController < ApplicationController
  before_action :set_artist, :check_correct_artist, :set_title

  def show; end

  def images
    @pagy, @images = artist_images
  end

  def tags
    @tags = artist_tags
  end

  def wiki; end

  def similar_artists
    @pagy, @similar_artists = artist_similar_artists
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
      params.slice(:artist_name).merge(full: true)
    )&.decorate
  end

  def set_title
    @title = t(
      "artists.#{params[:action]}",
      artist: @artist&.name
    )
  end

  def artist_images
    pagy_dynamic_array(
      images_data[:data], images_data[:total_count], 40
    )
  end

  def images_data
    @images_data ||= LastFM::Artist::Images.call(
      params.slice(:artist_name, :page)
    )
  end

  def artist_similar_artists
    pagy_dynamic_array(processed_similar_artists, 200, 15)
  end

  def processed_similar_artists
    Muffon::Processor::Artists.call(
      artists: similar_artists_data
    )
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
