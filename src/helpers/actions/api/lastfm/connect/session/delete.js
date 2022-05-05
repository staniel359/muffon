import store from '*/plugins/store'
import deleteRequest from '*/helpers/actions/api/request/delete'

export default function () {
  const profileId =
    store.getters['profile/id']

  const url =
    `/lastfm/connect/sessions/${profileId}`

  const handleSuccess = (
    response
  ) => {
    const info = {
      ...store.state.profile.info
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
