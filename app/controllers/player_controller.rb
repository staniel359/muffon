class PlayerController < ApplicationController
  include PlayerHelper

  def show
    set_title
  end

  def play
    Player::VK.clear(current_profile.id)
    set_previous_track_id
    set_track
    set_track_vk_ids
    set_audio_link
    set_playing_track_data if @audio_link.present?
    respond_with_js
  end

  def wrong_track
    delete_wrong_track_id
    set_audio_link
    set_playing_track_data if @audio_link.present?
    respond_with_js
  end

  def confirm_track
    track.update(vk_id: Player::VK.playing_now_id)
    respond_with_js
  end

  def stop
    stop_track
    respond_with_js
  end

  def watch_on_youtube
    set_track
    set_youtube_link
    respond_with_js
  end

private

  def set_title
    @title = t("player.#{params[:action]}")
  end

  def set_previous_track_id
    @previous_track_id =
      params[:previous_track_id] || playing_now_track_id
  end

  def set_track
    @track = Track.find_by(id: params[:track_id]).decorate
  end

  def set_track_vk_ids
    Player::VK.set_track_ids(current_profile.id, vk_track_ids)
  end

  def vk_track_ids
    VK::Tracks.call(
      artist_name: @track.artist_name,
      track_title: @track.title
    )
  end

  def set_audio_link
    @audio_link =
      @track.bandcamp_link || VK::Track.call(vk_id: vk_id)
  end

  def vk_id
    @vk_id ||= initial_vk_id || first_vk_id
  end

  def first_vk_id
    Player::VK.get_track_ids(current_profile.id)[0]
  end

  def initial_vk_id
    @track.vk_id if params[:action] == 'play'
  end

  def set_playing_track_data
    Player::PlayingNow.set(current_profile.id, @track.id)
    Player::VK.set_playing_now_id(current_profile.id, vk_id)
    Player::Source.create(
      current_profile.id, params[:source], params[:source_id]
    )
  end

  def delete_wrong_track_id
    Player::VK.delete_wrong_track_id(
      current_profile.id, Player::VK.playing_now_id
    )
  end

  def stop_track
    Player::PlayingNow.delete(current_profile.id)
    Player::VK.clear(current_profile.id)
    Player::Source.delete(current_profile.id)
  end

  def set_youtube_link
    @youtube_link = YouTube::Link.call(
      artist_name: @track.artist_name,
      track_title: @track.title
    )
  end
end
