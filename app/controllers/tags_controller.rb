class TagsController < ApplicationController
  def index
    @page_data = {
      title:    title
    }
  end

  def show
    @page_data = {
      title: title,
      tag_data: tag_data
    }
  end

  def artists
    @page_data = {
      title:   title,
      artists: retrieve_artists
    }
  end

  def albums
    @page_data = {
      title:   title,
      albums:  retrieve_albums
    }
  end

  def tracks
    @page_data = {
      title:   title,
      tracks:  retrieve_tracks
    }
  end

private

  def title
    t(
      "tags.#{params[:action]}",
      tag: params[:tag_name]
    )
  end

  def tag_data
    LastFM::Tag.call(tag_name: params[:tag_name])
  end

  def retrieve_artists
    artists_data = tag_collection('artists')
    paginate(
      paginate_array(
        artists_data[:data], artists_data[:total_count]
      )
    )
  end

  def tag_collection(collection)
    "LastFM::Tag::#{collection.capitalize}".constantize.call(
      params.slice(:name, :page)
    )
  end

  def retrieve_albums
    albums_data = tag_collection('albums')
    paginate(
      paginate_array(
        albums_data[:data], albums_data[:total_count]
      )
    )
  end

  def retrieve_tracks
    tracks_data = tag_collection('tracks')
    paginate(
      paginate_array(
        tracks_data[:data], tracks_data[:total_count]
      )
    )
  end
end
