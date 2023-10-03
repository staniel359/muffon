import {
  snakeCase
} from 'change-case'
import profileStore from '@/stores/profile'
import deleteRequest from '@/helpers/actions/api/request/delete'

export default function (
  {
    model,
    bookmarkId
  }
) {
  const profileId = profileStore().id

  const modelFormatted =
    snakeCase(
      model
    )

  const url =
    `/profiles/${profileId}/bookmarks` +
    `/${modelFormatted}s/${bookmarkId}`

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
