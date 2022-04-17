import store from '*/plugins/store'
import patchRequest from '*/helpers/actions/api/request/patch'

export default function (
  {
    postId,
    content,
    tracks,
    images
  }
) {
  this.newPostData = null

  const profileId =
    store.state.profile.info.id

  const url =
    `/profiles/${profileId}/posts/${postId}`

  const {
    token
  } = store.state.profile

  const params = {
    token,
    content,
    tracks,
    images
  }

  const handleSuccess = (
    response
  ) => {
    this.newPostData =
      response.data.post
  }

  const handleError = (
    error
  ) => {
    this.error = error
  }

  return patchRequest.bind(
    this
  )(
    {
      url,
      params,
      onSuccess: handleSuccess,
      onError: handleError
    }
  )
}
