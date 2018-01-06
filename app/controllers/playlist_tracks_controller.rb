class PlaylistTracksController < ApplicationController
  before_action :set_playlist_tracks, except: %i[
    search show_artist_tracks show_album_tracks add_track_to_playlists
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

  def add_profile_track
    profile_track = ProfileTrack.find(params[:profile_track_id])
    @tracks.create(
      profile_track_id: profile_track.id,
      track_id: profile_track.track.id,
      profile_artist_id: profile_track.profile_artist.id,
      artist_id: profile_track.artist.id
    )

    respond_to { |format| format.js { render 'tracks', layout: false } }
  rescue ActiveRecord::RecordNotUnique
    return
  end

  def add_track
    track = Track.find(params[:track_id])
    @tracks.create(
      track_id: track.id,
      artist_id: track.artist.id
    )
  rescue ActiveRecord::RecordNotUnique
    return
  end

  def add_track_to_playlists
    track = Track.find(params[:track_id])
    Playlist.where(name: params[:playlists_names]).each do |p|
      begin
        p.playlist_tracks.create!(
          track_id: track.id,
          artist_id: track.artist.id)
      rescue ActiveRecord::RecordNotUnique
        next
      end
    end

    respond_to { |format| format.js { render layout: false } }
  end

  def delete_track
    PlaylistTrack.find_by(track_id: params[:track_id])&.destroy

    respond_to { |format| format.js { render 'tracks', layout: false } }
  end

  def add_profile_artist
    profile_artist = ProfileArtist.find(params[:profile_artist_id])
    profile_artist.profile_tracks.each do |profile_track|
      begin
        @tracks.create(
          profile_track_id: profile_track.id,
          track_id: profile_track.track.id,
          profile_artist_id: profile_artist.id,
          artist_id: profile_artist.artist.id
        )
      rescue ActiveRecord::RecordNotUnique
        next
      end
    end

    respond_to { |format| format.js { render 'tracks', layout: false } }
  end

  def delete_artist
    PlaylistTrack.where(artist_id: params[:artist_id])&.delete_all

    respond_to { |format| format.js { render 'tracks', layout: false } }
  end

  def add_profile_album
    profile_album = ProfileAlbum.find(params[:profile_album_id])
    profile_album.tracks.each do |track|
      begin
        @tracks.create(
          profile_track_id: track.id,
          track_id: track.track.id,
          profile_artist_id: track.profile_artist.id,
          artist_id: track.artist.id,
          profile_album_id: profile_album.id,
          album_id: profile_album.album.id
        )
      rescue ActiveRecord::RecordNotUnique
        next
      end
    end

    respond_to { |format| format.js { render 'tracks', layout: false } }
  end

  def delete_album
    PlaylistTrack.where(album_id: params[:album_id])&.delete_all

    respond_to { |format| format.js { render 'tracks', layout: false } }
  end

private

  def set_playlist_tracks
    @tracks = Playlist.find_by(
      name: params[:playlist_name]
    ).playlist_tracks.includes(
      :track, :artist, :album
    ).page(params[:page]).per(10)
  end

  def search_model(model_name)
    "Library::Search::#{model_name.capitalize}s".constantize.call(
      profile_id: current_profile.id, q: params[:q]
    )
  end
end
