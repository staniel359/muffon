import store from '*/plugins/store'
import deleteRequest from '*/helpers/actions/api/request/delete'

export default function (
  {
    playlistId,
    playlistTrackId,
    isSelectable
  }
) {
  const profileId =
    store.state.profile.info.id

  const url =
    `/profiles/${profileId}` +
    `/playlists/${playlistId}` +
    `/tracks/${playlistTrackId}`

  const {
    token
  } = store.state.profile

  const params = {
    token
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

  return deleteRequest.bind(
    this
  )(
    {
      url,
      params,
      onSuccess: handleSuccess,
      isSaveError: true
    }
  )
}
