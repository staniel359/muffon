import profileStore from '@/stores/profile'
import patchRequest from '@/helpers/actions/api/request/patch'

export default function (
  {
    isOnline
  }
) {
  const profileId = profileStore().id

  const url =
    `/profiles/${profileId}/online`

  const params = {
    online: (
      isOnline ? 1 : 0
    )
  }

  function handleError (
    error
  ) {
    return error
  }

  return patchRequest(
    {
      url,
      params,
      isWithSelfToken: true,
      onError: handleError
    }
  )
}
