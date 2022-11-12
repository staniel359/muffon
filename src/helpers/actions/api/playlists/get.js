import getRequest from '@/helpers/actions/api/request/get'

export default function (
  {
    page,
    limit,
    order
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
      isWithSelfToken: true,
      page,
      limit,
      order,
      onSuccess: handleSuccess
    }
  )
}
