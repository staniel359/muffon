class BookmarksController < ApplicationController
  before_action :should_login, :set_title

  def index
    set_artist_bookmarks
    set_album_bookmarks
    set_track_bookmarks
  end

  def create
    set_object
    add_to_bookmarks
    respond_with_js
  end

  def destroy
    set_object
    delete_from_bookmarks
    respond_with_js
  end

  def artists
    set_artist_bookmarks
  end

  def albums
    set_album_bookmarks
  end

  def tracks
    set_track_bookmarks
  end

private

  def set_title
    @title = t("bookmarks.#{params[:action]}")
  end

  def set_artist_bookmarks
    @artist_bookmarks = paginate(
      current_profile.artist_bookmarks.associated.created_asc, 20
    )
  end

  def set_album_bookmarks
    @album_bookmarks = paginate(
      current_profile.album_bookmarks.associated.created_asc, 20
    )
  end

  def set_track_bookmarks
    @track_bookmarks = paginate(
      current_profile.track_bookmarks.associated.created_asc, 20
    )
  end

  def set_object
    @object = params[:model_type].constantize.find_by(
      id: params[:model_id]
    )
  end

  def add_to_bookmarks
    current_profile.bookmarks.where(
      bookmark_attributes
    ).first_or_create
  end

  def bookmark_attributes
    {
      bookmarkable_type: @object.class.to_s,
      bookmarkable_id: @object.id
    }
  end

  def delete_from_bookmarks
    current_profile.bookmarks.find_by(
      bookmark_attributes
    )&.destroy
  end
end
