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

  return postRequest.bind(
    this
  )(
    {
      url,
      params,
      isWithSelfId: true,
      isWithSelfToken: true,
      isSaveError: true
    }
  )
}
