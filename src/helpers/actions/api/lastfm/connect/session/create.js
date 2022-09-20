import store from '@/plugins/store'
import postRequest from '@/helpers/actions/api/request/post'

export default function (
  {
    lastfmToken
  }
) {
  const url = '/lastfm/connect/sessions'

  const params = {
    lastfm_token: lastfmToken
  }

  const handleSuccess = (
    response
  ) => {
    const profileInfo =
      store.state.profile.info

    const profileLastFmData =
      response.data.profile

    this.profileData = {
      ...profileInfo,
      ...profileLastFmData
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
