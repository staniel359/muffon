class BookmarksController < ApplicationController
  def index
    @title = 'Bookmarks'
    @bookmarks = current_profile.bookmarks
  end

  def create
    @artist = Artist.find(params[:artist_id])

    current_profile.bookmarks.create(
      artist_id: params[:artist_id],
      is: params[:is]
    )

    respond_to do |format|
      format.js { render layout: false }
    end
  end

  def destroy
    @artist = Artist.find(params[:artist_id])

    current_profile.bookmarks.find_by(
      artist_id: params[:artist_id]
    )&.destroy

    respond_to do |format|
      format.js { render layout: false }
    end
  end
end
