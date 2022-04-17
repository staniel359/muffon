import getRequest from '*/helpers/actions/api/request/get'

export default function (
  {
    model,
    artist,
    title
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
      return `${model}s/${title}`
    } else {
      return ''
    }
  }

  const url =
    `/bandcamp/id/${artist}/${formatModelUrl()}`

  function handleSuccess (
    response
  ) {
    return response.data
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
