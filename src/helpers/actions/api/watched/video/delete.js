import profileStore from '@/stores/profile'
import deleteRequest from '@/helpers/actions/api/request/delete'

export default function (
  {
    watchedId
  }
) {
  const profileId = profileStore().id

  const url =
    `/profiles/${profileId}/watched` +
    `/videos/${watchedId}`

  return deleteRequest.bind(
    this
  )(
    {
      url,
      isWithSelfToken: true
    }
  )
}
