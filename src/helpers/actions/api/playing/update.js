import profileStore from '@/stores/profile'
import patchRequest from '@/helpers/actions/api/request/patch'

export default function (
  {
    playing
  }
) {
  const profileId = profileStore().id

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
