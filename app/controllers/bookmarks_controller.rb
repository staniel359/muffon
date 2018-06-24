class BookmarksController < ApplicationController
  def index
    should_login
    @page_data = {
      title:     title,
      bookmarks: bookmarks
    }
  end

  def create
    should_login
    add_to_bookmarks
    respond_with_js
  end

  def destroy
    should_login
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

  def add_to_bookmarks
    current_profile.bookmarks.create(bookmark_attributes)
  end

  def bookmark_attributes
    {
      bookmarkable_type: params[:model_type],
      bookmarkable_id:   params[:model_id]
    }
  end

  def delete_from_bookmarks
    current_profile.bookmarks.find_by(
      bookmark_attributes
    )&.destroy
  end
end
