import getRequest from '@/helpers/actions/api/request/get'

export default function (
  {
    model,
    slug,
    artistSlug
  }
) {
  const isAlbumOrTrack = [
    'album',
    'track'
  ].includes(
    model
  )

  function formatModelUrl () {
    if (isAlbumOrTrack) {
      return `${model}s/${slug}`
    } else {
      return ''
    }
  }

  const url =
    `/bandcamp/id/${artistSlug}/${formatModelUrl()}`

  function handleSuccess (
    response
  ) {
    return response.data.id
  }

  return getRequest.bind(
    this
  )(
    {
      url,
      onSuccess: handleSuccess
    }
  )
}
