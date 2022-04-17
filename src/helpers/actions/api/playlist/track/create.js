import store from '*/plugins/store'
import postRequest from '*/helpers/actions/api/request/post'

export default function (
  {
    playlistId,
    trackTitle,
    artistName,
    albumTitle,
    image,
    imageUrl,
    created,
    isSelectable
  }
) {
  const profileId =
    store.state.profile.info.id

  const url =
    `/profiles/${profileId}/playlists/${playlistId}/tracks`

  const {
    token
  } = store.state.profile

  const params = {
    token,
    title: trackTitle,
    artist_name: artistName,
    album_title: albumTitle,
    image,
    image_url: imageUrl,
    created_at: created
  }

  const handleSuccess = (
    response
  ) => {
    if (isSelectable) {
      this.playlistTrackId =
          response.data.playlist_track_id

      this.paginationItem
        .tracks_count = response.data.playlist_tracks_count
    }
  }

  return postRequest.bind(
    this
  )(
    {
      url,
      params,
      onSuccess: handleSuccess
    }
  )
}
