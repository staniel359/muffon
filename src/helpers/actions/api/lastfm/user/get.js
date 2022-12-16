import profileStore from '@/stores/profile'
import getRequest from '@/helpers/actions/api/request/get'

export default function () {
  const lastfmNickname =
    profileStore().info.lastfm_nickname

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
      isWithSelfToken: true,
      onSuccess: handleSuccess
    }
  )
}
