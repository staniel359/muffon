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
    store.getters['profile/id']

  const url =
    `/profiles/${profileId}/playlists` +
    `/${playlistId}/tracks/${playlistTrackId}`

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
      isWithSelfToken: true,
      isSaveError: true,
      onSuccess: handleSuccess
    }
  )
}
