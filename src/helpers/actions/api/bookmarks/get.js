import {
  snakeCase
} from 'change-case'
import profileStore from '@/stores/profile'
import getRequest from '@/helpers/actions/api/request/get'

export default function (
  {
    scope = '',
    page,
    limit,
    order
  }
) {
  const profileId = profileStore().id

  const scopeFormatted =
    snakeCase(
      scope
    )

  const url =
    `/profiles/${profileId}` +
    `/bookmarks/${scopeFormatted}`

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
      order,
      isWithSelfToken: true,
      onSuccess: handleSuccess
    }
  )
}
