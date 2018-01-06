class PlayerController < ApplicationController
  before_action :set_track, :set_audio_link, only: %i[play confirm_track]

  def play
    @previous_track = Track.find_by(
      id: @redis.get("#{current_profile.id}:playing_now")
    )

    if @audio_link.present?
      send_track_to_redis
      @redis.lrem("#{current_profile.id}:queue", 0, @track.id)
    end

    respond_to { |format| format.js { render layout: false } }
  end

  def stop
    @track = Track.find_by(
      id: @redis.get("#{current_profile.id}:playing_now")
    )
    @redis.del("#{current_profile.id}:playing_now")
    @redis.lrem("#{current_profile.id}:queue", 1, @track.id)

    respond_to { |format| format.js { render layout: false } }
  end

  def send_to_queue
    @redis.rpush(
      "#{current_profile.id}:queue", params[:track_ids]
    )

    respond_to { |format| format.js { render 'queue', layout: false } }
  end

  def delete_from_queue
    @redis.lrem("#{current_profile.id}:queue", 0, params[:track_id])

    respond_to { |format| format.js { render 'queue', layout: false } }
  end

  def clear_queue
    @redis.del("#{current_profile.id}:queue")

    respond_to { |format| format.js { render 'queue', layout: false } }
  end

  def confirm_track
    @track.update(
      vk_id: @redis.get("#{current_profile.id}:playing_now_id")
    )

    respond_to { |format| format.js { render layout: false } }
  end

  def watch_on_youtube
    @link = "https://www.youtube.com/embed/#{youtube_id}?rel=0&autoplay=1"

    respond_to { |format| format.js { render layout: false } }
  end

private

  def set_track
    @track ||= Track.where(
      title: params[:track],
      artist_id: Artist.find_by(name: params[:artist]).id
    ).first_or_create
  end

  def set_audio_link
    return nil unless vk_id.present? || @track.bandcamp_link.present?

    @audio_link ||= @track.bandcamp_link || Vk::GetTrack.call(vk_id: vk_id)
  end

  def send_track_to_redis
    @redis.set(
      "#{current_profile.id}:playing_now", @track.id
    )
    @redis.set(
      "#{current_profile.id}:playing_now_id", vk_id
    )
    @redis.set(
      "#{current_profile.id}:vk_track_position", params[:position].to_i
    )
  end

  def vk_id
    return nil unless vk_tracks.present?
    return @track.vk_id if track_set_as_right?

    vk_tracks[params[:position].to_i].try(:[], 'data-full-id')
  end

  def track_set_as_right?
    @track.vk_id.present? && params[:position].nil?
  end

  def vk_tracks
    @vk_tracks ||= VK::GetTracks.call(
      artist: params[:artist],
      track: params[:track]
    )
  end

  def youtube_id
    JSON.parse(youtube_response)['items'][0]['id']['videoId']
  end

  def youtube_response
    track = Track.find(params[:track_id])
    RestClient.get(
      'https://www.googleapis.com/youtube/v3/search?part=snippet'\
      "&q=#{CGI.escape(track.artist.name) + '+' + CGI.escape(track.title)}"\
      "&maxResults=10&key=#{ENV['YOUTUBE_KEY']}"
    )
  end
end
