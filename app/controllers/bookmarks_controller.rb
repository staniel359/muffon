class BookmarksController < ApplicationController
  before_action :should_login, :set_title

  def index
    @artist_bookmarks = bookmarks('artist').limit(5)
    @album_bookmarks = bookmarks('album').limit(5)
    @track_bookmarks = bookmarks('track').limit(5)
  end

  def create
    @object = object
    add_to_bookmarks
    respond_with_js
  end

  def destroy
    @object = object
    delete_from_bookmarks
    respond_with_js
  end

  def artists
    @bookmarks = paginate(bookmarks('artist'), 20)
  end

  def albums
    @bookmarks = paginate(bookmarks('album'), 20)
  end

  def tracks
    @bookmarks = paginate(bookmarks('track'), 20)
  end

private

  def set_title
    @title = t("bookmarks.#{params[:action]}")
  end

  def bookmarks(model_name)
    current_profile.send(
      "#{model_name}_bookmarks"
    ).includes(:bookmarkable).created_asc
  end

  def object
    params[:model_type].constantize.find_by(
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
      bookmarkable_id:   @object.id
    }
  end

  def delete_from_bookmarks
    current_profile.bookmarks.find_by(
      bookmark_attributes
    )&.destroy
  end
end
