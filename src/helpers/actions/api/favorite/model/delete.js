import profileStore from '@/stores/profile'
import deleteRequest from '@/helpers/actions/api/request/delete'

export default function (
  {
    model,
    favoriteId
  }
) {
  const profileId = profileStore().id

  const url =
    `/profiles/${profileId}/favorites` +
    `/${model}s/${favoriteId}`

  return deleteRequest.bind(
    this
  )(
    {
      url,
      isWithSelfToken: true,
      isSaveError: true
    }
  )
}
