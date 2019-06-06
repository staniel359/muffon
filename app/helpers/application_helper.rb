module ApplicationHelper
  def page_title
    start_page? ? 'muffon' : "#{@title} | muffon"
  end

  def profiles_playlists_pagination_params
    {
      controller: '/profiles/playlists',
      action: 'show',
      playlist_name: @playlist.name
    }.merge(ids_params.map { |p| [p, nil] }.to_h)
  end

  def can_delete_micropost?(micropost)
    micropost.profile_id == current_profile.id ||
      micropost.board_id == current_profile.id
  end

  def can_delete_comment?(comment)
    comment.profile_id == current_profile.id
  end

private

  def start_page?
    params[:controller].in?(%w[registrations sessions]) ||
      params[:action] == 'start'
  end

  def ids_params
    %i[
      playlist_id profile_track_id track_id
      profile_artist_id artist_id
      profile_album_id album_id
    ]
  end
end
