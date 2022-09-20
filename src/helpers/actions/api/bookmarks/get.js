import store from '@/plugins/store'
import getRequest from '@/helpers/actions/api/request/get'

export default function (
  {
    scope = '',
    page,
    limit
  }
) {
  const profileId =
    store.getters['profile/id']

  const url =
    `/profiles/${profileId}/bookmarks/${scope}`

  const handleSuccess = (
    response
  ) => {
    this.bookmarksData =
      response.data.profile.bookmarks
  }

  return getRequest.bind(
    this
  )(
    {
      url,
      page,
      limit,
      isWithSelfToken: true,
      onSuccess: handleSuccess
    }
  )
}
