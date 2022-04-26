import store from '*/plugins/store'
import postRequest from '*/helpers/actions/api/request/post'

export default function (
  {
    otherProfileId,
    content,
    tracks,
    images
  }
) {
  const profileId =
    store.getters['profile/id']

  const url =
    `/profiles/${profileId}/posts`

  const params = {
    other_profile_id: otherProfileId,
    content,
    tracks,
    images
  }

  const handleError = (
    error
  ) => {
    this.error = error
  }

  return postRequest.bind(
    this
  )(
    {
      url,
      params,
      isWithSelfToken: true,
      onError: handleError
    }
  )
}
