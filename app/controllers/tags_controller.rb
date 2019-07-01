class TagsController < ApplicationController
  before_action :set_title

  def index; end

  def show
    set_tag
    set_tag_data
    set_current_artist_ids
    set_profile_instances
  end

  def artists
    set_artists
    set_profile_instances
    set_current_artist_ids
  end

  def albums
    set_albums
  end

  def tracks
    set_tracks
  end

private

  def set_title
    @title = t(
      "tags.#{params[:action]}",
      tag: params[:tag_name]
    )
  end

  def set_tag
    @tag = Muffon::Processor::Tag.call(
      tag_name: params[:tag_name]
    )
  end

  def set_tag_data
    @artists = @tag[:artists]
    @albums  = @tag[:albums]
    @tracks  = @tag[:tracks]
  end

  def set_current_artist_ids
    @current_artist_ids = @artists.pluck(:id)
  end

  def set_artists
    @artists = paginate_array(artists_data, 1000, 21)
  end

  def artists_data
    @artists_data ||= Muffon::Processor::Tag::Artists.call(
      params.slice(:tag_name, :page)
    )
  end

  def set_albums
    @albums = paginate_array(albums_data, 1000, 20)
  end

  def albums_data
    @albums_data ||= Muffon::Processor::Tag::Albums.call(
      params.slice(:tag_name, :page)
    )
  end

  def set_tracks
    @tracks = paginate_array(tracks_data, 1000, 50)
  end

  def tracks_data
    @tracks_data ||= Muffon::Processor::Tag::Tracks.call(
      params.slice(:tag_name, :page)
    )
  end
end
