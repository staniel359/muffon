import store from '@/plugins/store'
import deleteRequest from '@/helpers/actions/api/request/delete'

export default function (
  {
    model,
    modelId
  }
) {
  const profileId =
    store.getters['profile/id']

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
