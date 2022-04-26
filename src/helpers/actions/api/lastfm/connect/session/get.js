import store from '*/plugins/store'
import getRequest from '*/helpers/actions/api/request/get'

export default function (
  {
    token
  }
) {
  const url = '/lastfm/connect/session'

  const params = {
    token
  }

  const handleSuccess = (
    response
  ) => {
    const profileInfo =
      store.state.profile.info

    const profileLastFMData =
      response.data.profile

    this.profileData = {
      ...profileInfo,
      ...profileLastFMData
    }
  }

  return getRequest.bind(
    this
  )(
    {
      url,
      params,
      isWithSelfId: true,
      onSuccess: handleSuccess
    }
  )
}
