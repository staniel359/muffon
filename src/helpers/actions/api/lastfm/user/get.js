import store from '*/plugins/store'
import getRequest from '*/helpers/actions/api/request/get'

export default function () {
  const lastfmNickname =
    store.state.profile.info.lastfm_nickname

  const url =
    `/lastfm/users/${lastfmNickname}`

  const handleSuccess = (
    response
  ) => {
    this.userData = response.data.user
  }

  return getRequest.bind(
    this
  )(
    {
      url,
      onSuccess: handleSuccess
    }
  )
}
