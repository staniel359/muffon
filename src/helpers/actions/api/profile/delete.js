import profileStore from '@/stores/profile'
import deleteRequest from '@/helpers/actions/api/request/delete'

export default function (
  {
    password
  }
) {
  const profileId = profileStore().id

  const url = `/profiles/${profileId}`

  const params = {
    password
  }

  return deleteRequest.bind(
    this
  )(
    {
      url,
      params,
      isWithSelfToken: true,
      isSaveError: true
    }
  )
}
