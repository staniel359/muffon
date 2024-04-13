import profileStore from '@/stores/profile'
import postRequest from '@/helpers/actions/api/request/post'

export default function (
  {
    source,
    token,
    code,
    clientId,
    clientSecret
  }
) {
  const url = `/${source}/connections`

  let params = {}

  if (source === 'lastfm') {
    params = {
      lastfm_token: token
    }
  } else if (source === 'spotify') {
    params = {
      code,
      client_id: clientId,
      client_secret: clientSecret
    }
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
