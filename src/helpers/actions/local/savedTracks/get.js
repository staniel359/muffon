import getRequest from '@/helpers/actions/local/request/get'
import getLocalTracksByQuery from '@/helpers/actions/local/query/tracks/get'

export default function (
  {
    order,
    query
  }
) {
  const handleSuccess = (
    response
  ) => {
    if (query) {
      response.tracks =
        getLocalTracksByQuery(
          {
            tracks: response.tracks,
            query
          }
        )
    }

    this.savedTracksData = response
  }

  return getRequest.bind(
    this
  )(
    {
      key: 'profile.savedTracks',
      listScope: 'tracks',
      order,
      onSuccess: handleSuccess
    }
  )
}
