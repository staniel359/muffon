import store from '*/plugins/store'
import getRequest from '*/helpers/actions/api/request/get'

export default function (
  {
    tagName,
    scope = '',
    page,
    limit
  }
) {
  const tagNameEncoded =
    encodeURIComponent(
      tagName
    )

  const url =
    `/lastfm/tags/${tagNameEncoded}/${scope}`

  const profileId =
    store.state.profile.info.id

  const lang =
    store.state.profile.language

  const params = {
    profile_id: profileId,
    lang
  }

  const handleSuccess = (
    response
  ) => {
    this.tagData =
      response.data.tag
  }

  return getRequest.bind(
    this
  )(
    {
      url,
      params,
      page,
      limit,
      onSuccess: handleSuccess
    }
  )
}
