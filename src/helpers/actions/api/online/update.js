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

  const params = {
    token,
    online: isOnline
  }

  return patchRequest(
    {
      url,
      params
    }
  )
}
