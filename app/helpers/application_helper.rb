module ApplicationHelper
  def start_page?
    params[:action] == 'start' && !logged_in?
  end

  def page_title
    current_page?(root_url) ? 'muffon' : "#{@title} | muffon"
  end

  def profiles_playlists_pagination_params
    {
      controller: '/profiles/playlists',
      action: 'show',
      playlist_name: @playlist.name
    }.merge(ids_params.map { |p| [p, nil] }.to_h)
  end

private

  def ids_params
    %i[
      playlist_id profile_track_id track_id
      profile_artist_id artist_id
      profile_album_id album_id
    ]
  end
end
