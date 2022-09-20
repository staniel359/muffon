import store from '@/plugins/store'
import postRequest from '@/helpers/actions/api/request/post'

export default function (
  {
    image
  }
) {
  const profileId =
    store.getters['profile/id']

  const url =
    `/profiles/${profileId}/background_images`

  const params = {
    image
  }

  const handleSuccess = (
    response
  ) => {
    this.backgroundImage =
      response.data.profile.background_image
  }

  return postRequest.bind(
    this
  )(
    {
      url,
      params,
      isWithSelfToken: true,
      onSuccess: handleSuccess
    }
  )
}
