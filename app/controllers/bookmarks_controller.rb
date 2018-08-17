class BookmarksController < ApplicationController
  def index
    should_login
    @title = title
    @bookmarks = bookmarks
  end

  def create
    should_login
    @object = object
    add_to_bookmarks
    respond_with_js
  end

  def destroy
    should_login
    @object = object
    delete_from_bookmarks
    respond_with_js
  end

private

  def title
    t("bookmarks.#{params[:action]}")
  end

  def bookmarks
    paginate(current_profile.bookmarks.created_desc, 20)
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
