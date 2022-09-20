import store from '@/plugins/store'
import patchRequest from '@/helpers/actions/api/request/patch'

export default function (
  {
    playing
  }
) {
  const profileId =
    store.getters['profile/id']

  const url =
    `/profiles/${profileId}/playing`

  const params = {
    playing
  }

  return patchRequest(
    {
      url,
      params,
      isWithSelfToken: true
    }
  )
}
