import profileStore from '@/stores/profile'
import postRequest from '@/helpers/actions/api/request/post'

export default function (
  {
    source,
    lastfmToken,
    spotifyCode
  }
) {
  const url = `/${source}/connections`

  const params = {
    ...(lastfmToken && {
      lastfm_token: lastfmToken
    }),
    ...(spotifyCode && {
      spotify_code: spotifyCode
    })
  }

  const handleSuccess = (
    response
  ) => {
    const existingConnections =
      profileStore().connections

    const newConnections =
      response.data.profile.connections

    this.connectionsData = {
      ...existingConnections,
      ...newConnections
    }
  }

  return postRequest.bind(
    this
  )(
    {
      url,
      params,
      isWithSelfId: true,
      isWithSelfToken: true,
      isSaveError: true,
      onSuccess: handleSuccess
    }
  )
}
