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

  const isWithSelfLanguage = (
    !scope ||
      scope === 'description'
  )

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
      isWithSelfLanguage,
      page,
      limit,
      onSuccess: handleSuccess
    }
  )
}
