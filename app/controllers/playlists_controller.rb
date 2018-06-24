class PlaylistsController < ApplicationController
  before_action :set_playlists

  def index
    @page_data = {
      title: title,
      playlists: playlists
    }
    @title = 'Playlists'
  end

private

  def title
    t("playlists.#{params[:action]}")
  end

  def playlists
    paginate(Playlist.created_desc, 20)
  end
end
