import store from '@/plugins/store'
import deleteRequest from '@/helpers/actions/api/request/delete'

export default function (
  {
    model,
    bookmarkId
  }
) {
  const profileId =
    store.getters['profile/id']

  const url =
    `/profiles/${profileId}` +
    `/bookmarks/${model}s/${bookmarkId}`

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
