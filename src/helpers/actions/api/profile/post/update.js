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
    store.getters['profile/id']

  const url =
    `/profiles/${profileId}/posts/${postId}`

  const params = {
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
      isWithSelfToken: true,
      onSuccess: handleSuccess,
      onError: handleError
    }
  )
}
