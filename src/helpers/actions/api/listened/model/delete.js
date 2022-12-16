import profileStore from '@/stores/profile'
import deleteRequest from '@/helpers/actions/api/request/delete'

export default function (
  {
    model,
    listenedId
  }
) {
  const profileId = profileStore().id

  const url =
    `/profiles/${profileId}/listened` +
    `/${model}s/${listenedId}`

  return deleteRequest.bind(
    this
  )(
    {
      url,
      isWithSelfToken: true
    }
  )
}
