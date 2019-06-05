class FeedController < ApplicationController
  def index
    set_title
    set_feed_items
  end

private

  def set_title
    @title = t("feed.#{params[:action]}")
  end

  def set_feed_items
    @feed_items = Micropost.own_board_posts.where(
      profile_id: feed_profile_ids
    ).created_desc.includes(:profile)
  end

  def feed_profile_ids
    current_profile.following_ids << current_profile.id
  end
end
