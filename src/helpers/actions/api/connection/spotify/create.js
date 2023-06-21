import profileStore from '@/stores/profile'
import postRequest from '@/helpers/actions/api/request/post'

export default function (
  {
    code
  }
) {
  const url = '/spotify/connect/sessions'

  const params = {
    code
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
