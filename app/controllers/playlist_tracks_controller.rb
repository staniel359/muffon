class PlaylistTracksController < ApplicationController
  before_action :set_playlist_tracks, except: %i[
    search show_artist_tracks show_album_tracks
  ]

  def search
    @tracks = search_model('track')
    @artists = search_model('artist')
    @albums = search_model('album')

    respond_to { |format| format.js { render layout: false } }
  end

  def show_artist_tracks
    @tracks = Library::ArtistTracks.call(
      id: params[:profile_artist_id]
    )

    respond_to { |format| format.js { render layout: false } }
  end

  def show_album_tracks
    @tracks = Library::AlbumTracks.call(
      id: params[:profile_album_id]
    )

    respond_to { |format| format.js { render layout: false } }
  end

  def add_track
    track = ProfileTrack.find(params[:profile_track_id])
    @tracks.create(track_params(track))

    respond_to { |format| format.js { render 'tracks', layout: false } }
  rescue ActiveRecord::RecordNotUnique
    return
  end

  def delete_track
    PlaylistTrack.find(params[:playlist_track_id])&.destroy

    respond_to { |format| format.js { render 'tracks', layout: false } }
  end

  def add_artist
    ProfileArtist.find(
      params[:profile_artist_id]
    ).profile_tracks.each do |track|
      @tracks.create(track_params(track))
    end

    respond_to { |format| format.js { render 'tracks', layout: false } }
  rescue ActiveRecord::RecordNotUnique
    return
  end

  def delete_artist
    PlaylistTrack.where(
      profile_artist_id: params[:playlist_artist_id]
    )&.delete_all

    respond_to { |format| format.js { render 'tracks', layout: false } }
  end

  def add_album
    ProfileAlbum.find(
      params[:profile_album_id]
    ).tracks.each do |track|
      @tracks.create(track_params(track).merge(album_params))
    end

    respond_to { |format| format.js { render 'tracks', layout: false } }
  rescue ActiveRecord::RecordNotUnique
    return
  end

  def delete_album
    PlaylistTrack.where(
      profile_album_id: params[:profile_album_id]
    )&.delete_all

    respond_to { |format| format.js { render 'tracks', layout: false } }
  end

private

  def set_playlist_tracks
    @tracks = Playlist.find_by_name(
      params[:playlist_name]
    ).playlist_tracks.includes(
      :track, :artist, :album
    ).page(params[:page]).per(10)
  end

  def search_model(model_name)
    "Library::Search::#{model_name.capitalize}s".constantize.call(
      profile_id: current_profile.id, q: params[:q]
    )
  end

  def track_params(track)
    {
      profile_track_id: track.id,
      track_id: track.track_id,
      profile_artist_id: track.profile_artist_id,
      artist_id: track.artist_id
    }
  end

  def album_params
    {
      profile_album_id: params[:profile_album_id],
      album_id: params[:album_id]
    }
  end
end
