class PlaylistsController < ApplicationController
  def index
    set_title
    set_playlists
    set_new_playlist
  end

private

  def set_title
    @title = t("playlists.#{params[:action]}")
  end

  def set_playlists
    @playlists = paginate(Playlist.associated.created_desc, 20)
  end

  def set_new_playlist
    @new_playlist = current_profile.playlists.new
  end
end
