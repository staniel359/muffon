import profileStore from '@/stores/profile'
import deleteRequest from '@/helpers/actions/api/request/delete'

export default function (
  {
    model,
    recommendationId
  }
) {
  const profileId = profileStore().id

  const url = (
    `/profiles/${profileId}/recommendations` +
    `/${model}s/${recommendationId}`
  )

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
