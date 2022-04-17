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
    store.state.profile.info.id

  const url =
    `/profiles/${profileId}/posts`

  const {
    token
  } = store.state.profile

  const params = {
    other_profile_id: otherProfileId,
    token,
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
      onError: handleError
    }
  )
}
