import profileStore from '@/stores/profile'
import deleteRequest from '@/helpers/actions/api/request/delete'

export default function (
  {
    playlistId
  }
) {
  const profileId = profileStore().id

  const url =
    `/profiles/${profileId}/playlists/${playlistId}`

  return deleteRequest.bind(
    this
  )(
    {
      url,
      isWithSelfToken: true,
      isSaveError: true
    }
  )
}
