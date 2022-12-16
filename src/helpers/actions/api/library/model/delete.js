import profileStore from '@/stores/profile'
import deleteRequest from '@/helpers/actions/api/request/delete'

export default function (
  {
    model,
    modelId
  }
) {
  const profileId = profileStore().id

  const url =
    `/profiles/${profileId}` +
    `/library/${model}s/${modelId}`

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
