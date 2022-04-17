import store from '*/plugins/store'
import patchRequest from '*/helpers/actions/api/request/patch'

export default function (
  {
    communityId,
    postId,
    content,
    tracks,
    images,
    byCommunity
  }
) {
  this.newPostData = null

  const url =
    `/communities/${communityId}/posts/${postId}`

  const profileId =
    store.state.profile.info.id

  const {
    token
  } = store.state.profile

  const params = {
    profile_id: profileId,
    token,
    content,
    tracks,
    images,
    by_community: byCommunity
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
