import profileStore from '@/stores/profile'
import postRequest from '@/helpers/actions/api/request/post'

export default function (
  {
    lastfmToken
  }
) {
  const url = '/lastfm/connections'

  const params = {
    lastfm_token: lastfmToken
  }

  const handleSuccess = (
    response
  ) => {
    this.connectionsData = {
      ...profileStore().connections,
      ...response.data.profile.connections
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
