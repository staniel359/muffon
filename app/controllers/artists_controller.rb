class ArtistsController < ApplicationController
  def show
    @page_data = {
      title:           title,
      top_tags:        artist.tags,
      taggings:        retrieve_taggings,
      top_tracks:      artist.top_tracks,
      top_albums:      artist.top_albums,
      similar_artists: artist.similar_artists
    }
  end

  def images
    @page_data = {
      title:  title,
      images: retrieve_images
    }
  end

  def similar_artists
    @page_data = {
      title:           title,
      similar_artists: retrieve_similar_artists
    }
  end

  def wiki
    @page_data = {
      title: title,
      wiki:  artist.description
    }
  end

  def tags
    @page_data = {
      title: title,
      tags:  retrieve_tags
    }
  end

  def listeners
    @page_data = {
      title:     title,
      listeners: retrieve_listeners
    }
  end

  def plays
    @page_data = {
      title: title,
      plays: retrieve_plays
    }
  end

private

  def title
    t(
      "artists.#{params[:action]}",
      artist: artist.name
    )
  end

  def artist
    @artist ||= Muffon::Processor::Artist.call(
      params.slice(:artist_name)
    )
  end

  def retrieve_taggings
    return unless logged_in?

    current_profile.artist_taggings(artist.id)
  end

  def retrieve_images
    paginate_array(
      images_data[:data],
      images_data[:total_count]
    )
  end

  def images_data
    @images_data ||= Lastfm::Artist::Images.call(
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

  def retrieve_tags
    LastFM::Tags.call(
      params.slice(:artist_name).merge!(
        model_name: 'artist'
      )
    )
  end

  def retrieve_listeners
    paginate(artist.profiles.created_desc, 50)
  end

  def retrieve_plays
    paginate(artist.plays.created_desc, 50)
  end
end
