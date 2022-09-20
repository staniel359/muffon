import getRequest from '@/helpers/actions/api/request/get'

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
      isWithSelfId: true,
      isWithSelfLanguage: true,
      page,
      limit,
      onSuccess: handleSuccess
    }
  )
}
