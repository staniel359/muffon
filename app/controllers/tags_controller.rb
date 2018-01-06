class TagsController < ApplicationController
  def index
    @title = 'Tags'
  end

  def show
    @title = "#{params[:name]} tag"
    @artists = tag_media[:artists]
    @albums = tag_media[:albums]
    @tracks = tag_media[:tracks]
  end

  def artists
    @title = "#{params[:name]} tag - Top artists"
    @artists = Kaminari.paginate_array(
      set_tag_artists, total_count: 1000
    ).page(params[:page]).per(21)
  end

  def albums
    @title = "#{params[:name]} tag - Top albums"
    @albums = Kaminari.paginate_array(
      set_tag_albums, total_count: 1000
    ).page(params[:page]).per(20)
  end

  def tracks
    @title = "#{params[:name]} tag - Top tracks"
    @tracks = Kaminari.paginate_array(
      set_tag_tracks, total_count: 1000
    ).page(params[:page]).per(50)
  end

private

  def tag_media
    @tag_media ||= Lastfm::Tag::Media.call(name: params[:name])
  end

  def set_tag_artists
    Lastfm::Tag::Artists.call(
      name: params[:name],
      page: params[:page]
    )
  end

  def set_tag_albums
    Lastfm::Tag::Albums.call(
      name: params[:name],
      page: params[:page]
    )
  end

  def set_tag_tracks
    Lastfm::Tag::Tracks.call(
      name: params[:name],
      page: params[:page]
    )
  end
end
