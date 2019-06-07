class RadioController < ApplicationController
  def show
    title
  end

  def play
    save_artist_name if params[:artist_name].present?
    save_tag_name if params[:tag_name].present?
    track
    respond_with_js
  end

private

  def title
    @title = t("radio.#{params[:action]}")
  end

  def save_artist_name
    $redis.del(
      "#{current_profile.id}:radio_tag"
    )
    $redis.set(
      "#{current_profile.id}:radio_artist",
      params[:artist_name]
    )
  end

  def save_tag_name
    $redis.del(
      "#{current_profile.id}:radio_artist"
    )
    $redis.set(
      "#{current_profile.id}:radio_tag",
      params[:tag_name]
    )
  end

  def track
    @track = artist_track || tag_track
  end

  def artist_track
    return unless artist_name.present?

    Muffon::Radio::Artist.call(
      artist_name: artist_name
    )[:track]
  end

  def artist_name
    params[:artist_name].presence || retrieve_artist_name
  end

  def retrieve_artist_name
    $redis.get("#{current_profile.id}:radio_artist")
  end

  def tag_track
    return unless tag_name.present?

    Muffon::Radio::Tag.call(
      tag_name: tag_name
    )[:track]
  end

  def tag_name
    params[:tag_name].presence || retrieve_tag_name
  end

  def retrieve_tag_name
    $redis.get("#{current_profile.id}:radio_tag")
  end
end
