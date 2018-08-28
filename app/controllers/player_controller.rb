class PlayerController < ApplicationController
  before_action :set_title, only: :show
  def show; end

  def play
    set_track_vk_ids
    @page_data = {
      audio_link: audio_link
    }
    set_playing_track_data if audio_link.present?
    respond_with_js
  end

  def play_next
    delete_played_track_id
    @page_data = {
      audio_link: audio_link
    }
    set_playing_track_data if audio_link.present?
    respond_with_js
  end

  def confirm_vk_track
    track.update(vk_id: Player::VK.playing_now_id)
    respond_with_js
  end

  def stop
    set_stopped_track_data
    respond_with_js
  end

  def send_to_queue
    Player::Queue.add_tracks(current_profile.id, params[:track_ids])
    respond_with_js
  end

  def delete_from_queue
    Player::Queue.delete_track(current_profile.id, track.id)
    respond_with_js
  end

  def clear_queue
    Player::Queue.clear(current_profile.id)
    respond_with_js
  end

  def watch_on_youtube
    @page_data = {
      youtube_link: youtube_link
    }
    respond_with_js
  end

private

  def set_title
    @title = t("player.#{params[:action]}")
  end

  def set_track_vk_ids
    Player::VK.set_track_ids(current_profile.id, vk_track_ids)
  end

  def vk_track_ids
    VK::Tracks.call(params.slice(:artist_name, :track_title))
  end

  def audio_link
    @audio_link ||= VK::Track.call(vk_id: vk_id)
  end

  def vk_id
    initial_vk_id || Player::VK.track_ids[0]
  end

  def initial_vk_id
    params[:action] == 'play' && track.vk_id
  end

  def track
    @track ||= Muffon::Processor::Track.call(
      params.slice(:artist_name, :track_title)
    )
  end

  def set_playing_track_data
    Player::PlayingNow.set(current_profile.id, track.id)
    Player::VK.set_playing_now_id(current_profile.id, vk_id)
    Player::Source.create(current_profile.id, source_with_id)
  end

  def source_with_id
    "#{params[:source]}_#{params[:source_id]}"
  end

  def delete_played_track_id
    Player::VK.delete_played_track_id(
      current_profile.id, Player::VK.playing_now_id
    )
  end

  def set_stopped_track_data
    Player::PlayingNow.delete(current_profile.id)
    Player::VK.clear(current_profile.id)
    Player::Source.delete(current_profile.id)
    Player::Queue.delete_track(current_profile.id, track.id)
  end

  def youtube_link
    YouTube::Link.call(params.slice(:artist_name, :track_title))
  end
end
