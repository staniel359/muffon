import profileStore from '@/stores/profile'
import deleteRequest from '@/helpers/actions/api/request/delete'

export default function (
  {
    playlistId,
    playlistTrackId,
    isSelectable
  }
) {
  const profileId = profileStore().id

  const url =
    `/profiles/${profileId}/playlists` +
    `/${playlistId}/tracks/${playlistTrackId}`

  const handleSuccess = (
    response
  ) => {
    if (isSelectable) {
      this.paginationItem.tracks_count =
        response.data.playlist.tracks_count
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
