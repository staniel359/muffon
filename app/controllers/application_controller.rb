class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token
  include SessionsHelper

  def not_found
    @title = 'Not found'
    render file: '/exceptions/not_found', status: :not_found
  end

private

  def set_profile
    @profile = Profile.find_by(id: params[:profile_id])&.decorate
  end

  def respond_with_js_and_html
    respond_to do |format|
      format.html
      format.js { render layout: false }
    end
  end

  def respond_with_js
    respond_to { |format| format.js { render layout: false } }
  end

  def check_correct_profile
    redirect_to root_path unless current_profile?(@profile)
  end

  def paginate(collection, limit)
    (
      collection.page(params[:page]).per(limit).presence ||
        collection.page(params[:page].to_i - 1).per(limit)
    )
  end

  def paginate_array(collection, total_count, per_page)
    paginate(
      Kaminari.paginate_array(
        collection, total_count: total_count
      ), per_page
    )
  end

  def check_correct_artist
    not_found if @artist.nil?
  end

  def check_correct_album
    not_found if @album.nil?
  end

  def set_profile_instances
    set_profile_artist_ids
    set_bookmarked_artist_ids
    set_listened_artist_ids
  end

  def set_profile_artist_ids
    @profile_artist_ids = current_profile.profile_artists.where(
      artist_id: @current_artist_ids
    ).pluck(:artist_id)
  end

  def set_bookmarked_artist_ids
    @bookmarked_artist_ids = current_profile.bookmarks.where(
      bookmarkable_type: 'Artist',
      bookmarkable_id: @current_artist_ids
    ).pluck(:bookmarkable_id)
  end

  def set_listened_artist_ids
    @listened_artist_ids = current_profile.listened_artists.where(
      artist_id: @current_artist_ids
    ).pluck(:artist_id)
  end
end
