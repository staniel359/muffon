import getRequest from '*/helpers/actions/api/request/get'

export default function (
  {
    page,
    limit
  }
) {
  const url = '/playlists'

  const handleSuccess = (
    response
  ) => {
    this.playlistsData =
      response.data.playlists
  }

  return getRequest.bind(
    this
  )(
    {
      url,
      page,
      limit,
      onSuccess: handleSuccess
    }
  )
}
