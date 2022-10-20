import getRequest from '@/helpers/actions/api/request/get'

export default function (
  {
    playlistId,
    scope = '',
    page,
    limit
  }
) {
  const url =
    `/youtube/playlists/${playlistId}/${scope}`

  const handleSuccess = (
    response
  ) => {
    this.playlistData =
      response.data.playlist
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
