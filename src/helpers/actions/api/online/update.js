import store from '*/plugins/store'
import patchRequest from '*/helpers/actions/api/request/patch'

export default function (
  {
    isOnline
  }
) {
  const profileId =
    store.state.profile.info.id

  const url =
    `/profiles/${profileId}/online`

  const {
    token
  } = store.state.profile

  const online = isOnline ? 1 : 0

  const params = {
    token,
    online
  }

  return patchRequest(
    {
      url,
      params
    }
  )
}
