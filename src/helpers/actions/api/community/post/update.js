import patchRequest from '*/helpers/actions/api/request/patch'

export default function (
  {
    communityId,
    postId,
    text,
    images,
    artists,
    albums,
    tracks,
    byCommunity
  }
) {
  this.newPostData = null

  const url =
    `/communities/${communityId}/posts/${postId}`

  const params = {
    text,
    images,
    artists,
    albums,
    tracks,
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
      isWithSelfId: true,
      isWithSelfToken: true,
      onSuccess: handleSuccess,
      onError: handleError
    }
  )
}
