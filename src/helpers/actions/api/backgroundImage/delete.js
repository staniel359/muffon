import store from '*/plugins/store'
import deleteRequest from '*/helpers/actions/api/request/delete'

export default function (
  {
    imageId
  }
) {
  const profileId =
    store.getters['profile/id']

  const url =
    `/profiles/${profileId}/background_images/${imageId}`

  return deleteRequest.bind(
    this
  )(
    {
      url,
      isWithSelfToken: true
    }
  )
}
