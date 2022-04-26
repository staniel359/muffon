import store from '*/plugins/store'
import patchRequest from '*/helpers/actions/api/request/patch'

export default function (
  {
    isOnline
  }
) {
  const profileId =
    store.getters['profile/id']

  const url =
    `/profiles/${profileId}/online`

  const online = isOnline ? 1 : 0

  const params = {
    online
  }

  return patchRequest(
    {
      url,
      params,
      isWithSelfToken: true
    }
  )
}
