import postRequest from '*/helpers/actions/api/request/post'

export default function (
  {
    communityId,
    content,
    tracks,
    images,
    byCommunity
  }
) {
  const url =
    `/communities/${communityId}/posts`

  const params = {
    content,
    tracks,
    images,
    by_community: byCommunity
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
      isWithSelfId: true,
      isWithSelfToken: true,
      onError: handleError
    }
  )
}
