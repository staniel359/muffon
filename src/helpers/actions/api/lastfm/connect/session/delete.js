import profileStore from '@/stores/profile'
import deleteRequest from '@/helpers/actions/api/request/delete'

export default function () {
  const profileId = profileStore().id

  const url =
    `/lastfm/connect/sessions/${profileId}`

  const handleSuccess = (
    response
  ) => {
    const info = {
      ...profileStore().info
    }

    delete info.lastfm_nickname
    delete info.lastfm_session_key

    this.profileData = info
  }

  return deleteRequest.bind(
    this
  )(
    {
      url,
      isWithSelfId: true,
      isWithSelfToken: true,
      isSaveError: true,
      onSuccess: handleSuccess
    }
  )
}
