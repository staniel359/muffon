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
    const playlistData =
      response.data.playlist

    this.playlistData = playlistData

    return playlistData
  }

  return getRequest.bind(
    this
  )(
    {
      url,
      page,
      limit,
      isWithSelfId: true,
      isWithSelfToken: true,
      onSuccess: handleSuccess
    }
  )
}
